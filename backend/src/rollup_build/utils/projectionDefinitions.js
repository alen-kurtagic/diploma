"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var proj4_1 = __importDefault(require("proj4"));
// Define the D96 projection
proj4_1.default.defs("EPSG:3794", "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ");
// Define the Web Mercator projection
proj4_1.default.defs("EPSG:3857", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
exports.default = proj4_1.default;
//# sourceMappingURL=projectionDefinitions.js.map