import proj4 from "proj4";

// Define the D96 projection
proj4.defs(
  "EPSG:3794",
  "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
);

// Define the Web Mercator projection
proj4.defs("EPSG:3857", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

export default proj4;
