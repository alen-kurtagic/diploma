import requests
import os
import zipfile
from io import BytesIO
import re
import psycopg2
import subprocess
import time
from urllib3.exceptions import InsecureRequestWarning
import config
import logging

# Disable the InsecureRequestWarning
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

# Set up logging

# Define the logging format with ANSI escape codes for white and bold font
# log_format = logging.Formatter('\033[37m[%(asctime)s] [%(levelname)s] \033[1m %(message)s\033[0m\033[0m', datefmt='%d.%m.%Y %H:%M:%S')
log_format = logging.Formatter('\033[37m[%(asctime)s] \033[1m %(message)s\033[0m\033[0m', datefmt='%d.%m.%Y %H:%M:%S')

# Create a logger and set the logging level
logger = logging.getLogger('logger')
logger.setLevel(logging.INFO)

# Create a handler that outputs to the console with the defined format
console_handler = logging.StreamHandler()
console_handler.setFormatter(log_format)

# Add the console handler to the logger
logger.addHandler(console_handler)


def get_existing_sources(data_path):
    source_names = []

    for item in os.listdir(data_path):
        full_path = os.path.join(data_path, item)
        if os.path.isfile(full_path) or os.path.isdir(full_path):
            name = os.path.splitext(item)[0]
            source_names.append(name)

    return source_names


def is_new_source_available(url, headers, existing_sources):
    response = requests.head(url, headers=headers, verify=False)
    content_disposition_header = response.headers["Content-Disposition"]

    if not content_disposition_header:
        logger.error("Content-Disposition header not found in response.")
        return False

    filename_regex = r'filename="(.*)"'
    filename_match = re.search(filename_regex, content_disposition_header)

    if not filename_match:
        logger.error("Filename not found in Content-Disposition header.")
        return False

    filename = filename_match.group(1).split(".")[0]

    if filename in existing_sources:
        return False

    return filename


def extract_zip_recursive(zip_file, target_path):
    for member in zip_file.namelist():
        if member.endswith('.zip'):
            # If the file is another zip file, extract it
            with zip_file.open(member, 'r') as inner_zip_file_raw:
                with zipfile.ZipFile(BytesIO(inner_zip_file_raw.read())) as inner_zip_file:
                    inner_target_path = os.path.join(target_path, os.path.dirname(member))
                    extract_zip_recursive(inner_zip_file, inner_target_path)
        else:
            # Extract the file
            zip_file.extract(member, target_path)


def download_and_extract_source(url, target_path):
    response = requests.get(url, stream=True, verify=False)
    try:
        with zipfile.ZipFile(BytesIO(response.content), "r") as zip_file:
            logger.info("Extracting the downloaded source.")
            extract_zip_recursive(zip_file, target_path)
            logger.info("Extraction completed.")
    except zipfile.BadZipFile:
        logger.error("The downloaded file is not a valid ZIP file")


def import_and_transform_shapefile(target_path, db_params, relation_name, shapefile_name):
    # # Generate SQL file from the shapefile using shp2pgsql
    logger.info("Generating .sql file.")
    sql_file = f"{target_path}/{shapefile_name}.sql"
    cmd = f'shp2pgsql -s 3794 "{target_path}/{shapefile_name}.shp" layers.{relation_name} > "{sql_file}"'
    logger.info(f"Running the following command: {cmd}.")
    subprocess.run(cmd, shell=True, check=True)
    logger.info("Finished generating .sql file.")

    # Connect to the database and execute SQL
    logger.info("Connecting to the database.")
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    logger.info("Executing previously generated .sql file line by line.")
    with open(sql_file, 'r') as f:
        sql_query = ""
        for line in f:
            # Skip comments and empty lines
            if line.startswith('--') or line.strip() == '':
                continue

            sql_query += line

            # Execute the query when a semicolon is encountered
            if ';' in line:
                cursor.execute(sql_query)
                sql_query = ""

    logger.info("Transforming to EPSG:4326 projection.")
    transform_query = f"ALTER TABLE layers.{relation_name} ADD COLUMN geom_4326 geometry(Geometry, 4326);" \
                      f"UPDATE layers.{relation_name} SET geom_4326 = ST_Transform(geom, 4326);"
    cursor.execute(transform_query)

    # Create an index on the transformed geometry column
    logger.info("Creating an index on transformed geometry.")
    index_query = f"CREATE INDEX idx_{relation_name}_geom_4326 ON layers.{relation_name} USING GIST (geom_4326);"
    cursor.execute(index_query)

    # Commit changes and close the connection
    logger.info("Commiting changes and closing connection to the database.")
    conn.commit()
    cursor.close()
    conn.close()

    # Remove temporary SQL file
    # os.remove(sql_file)


def main():
    start_time = time.time()

    logger.info(f"Getting current sources in {config.DATA_PATH} directory.")
    existing_sources = get_existing_sources(config.DATA_PATH)

    logger.info("Checking for newer source online.")
    new_source_name = is_new_source_available(config.SOURCE_URL, config.REQUEST_HEADERS, existing_sources)

    if new_source_name:
        target_path = os.path.join(config.DATA_PATH, new_source_name)

        logger.info("Requesting to download new source.")
        download_and_extract_source(config.SOURCE_URL, target_path)

        logger.info("Beginning to import the new source.")
        import_and_transform_shapefile(target_path, config.DB_CONNECTION_PARAMS, new_source_name, config.SHAPEFILE_NAME)

        logger.info("Imported new source successfully.")
    else:
        logger.info("Source already up to date.")

    end_time = time.time()
    elapsed_time = round(end_time - start_time, 2)
    logger.info(f'Program executed in {elapsed_time} seconds.')


if __name__ == "__main__":
    main()
