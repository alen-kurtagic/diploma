import os
from dotenv import load_dotenv

load_dotenv('../.env')

REQUEST_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en,en-GB;q=0.9,en-US;q=0.8,sl;q=0.7,hr;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': '_ga=GA1.2.454850859.1678782170',
    'Host': 'ipi.eprostor.gov.si',
    'Pragma': 'no-cache',
    'Referer': 'https://ipi.eprostor.gov.si/jgp/data',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
}


DATA_PATH = 'C:/University/Year 3/Term 2/Diplomsko delo/gradbena-soglasja/database/data'


SOURCE_URL = "https://ipi.eprostor.gov.si/jgp-service-api/display-views/groups/122/composite-products/25/file?filterParam=DRZAVA&filterValue=1"


DB_CONNECTION_PARAMS = {
    'dbname': os.environ.get("DATABASE"),
    'user': os.environ.get("USER"),
    'password': os.environ.get("PASSWORD"),
    'host': os.environ.get("HOST"),
    'port': os.environ.get("PGSQL_PORT")
}


SHAPEFILE_NAME = "KN_SLO_PARCELE_SLO_PARCELE_poligon"
