"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelsTableName = exports.getByIds = exports.getByBbox = void 0;
var connection_1 = require("../connection");
var parcelsTableName = "data.parcels";
exports.parcelsTableName = parcelsTableName;
var landusesTableName = "data.landuses";
var settlementTableName = "codebook.settlement";
var landuseTableName = "codebook.landuse";
var getByBbox = function (bbox) { return __awaiter(void 0, void 0, void 0, function () {
    var minX, minY, maxX, maxY, query;
    return __generator(this, function (_a) {
        minX = bbox[0], minY = bbox[1], maxX = bbox[2], maxY = bbox[3];
        query = "\n    SELECT gid, quality, ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry\n    FROM ".concat(parcelsTableName, "\n    WHERE \n    ST_Intersects(\n      geom_4326, \n      ST_MakeEnvelope(\n        ").concat(minX, ", \n        ").concat(minY, ", \n        ").concat(maxX, ", \n        ").concat(maxY, ", \n        4326\n      )\n    ) \n  ");
        return [2 /*return*/, executeQuery(query)];
    });
}); };
exports.getByBbox = getByBbox;
var getByIds = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        query = "\n\n  WITH data AS (\n    SELECT \n      parcels.parcel_id\n      parcels.quality, \n      settlement.settlement, \n      landuse.landuse, \n      landuse.share, \n      landuse.code,\n      ST_AsGeoJSON((ST_Dump(geom_4326)).geom)::json AS geometry\n    FROM ".concat(parcelsTableName, "\n    LEFT JOIN ").concat(settlementTableName, " ON (ko_id = code)\n    LEFT JOIN ").concat(landusesTableName, " USING (eid_parcel)\n    LEFT JOIN ").concat(landuseTableName, " ON (vrsta_namenske_rabe_id = raba_id)\n    WHERE parcel_id IN (").concat(ids.join(","), ")\n  ),\n  aggregated_landuse AS (\n    SELECT parcel_id, json_agg(json_build_object('opis_sl', opis_sl, 'delez', delez, 'sifra', sifra)) as landuse_summary\n    FROM first\n    GROUP BY parcel_id\n  )\n  SELECT DISTINCT ON (parcel_id) *\n  FROM data\n  INNER JOIN aggregated_landuse USING (parcel_id);\n  ");
        console.log(query);
        return [2 /*return*/, executeQuery(query)];
    });
}); };
exports.getByIds = getByIds;
var executeQuery = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                connection_1.pool.query(query, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        var features = result.rows.map(function (row) {
                            return ({
                                type: "Feature",
                                geometry: row.geometry,
                                properties: {
                                    gid: row.gid,
                                    parcel_id: row.parcel_id,
                                    quality: row.quality,
                                    settlement: row.settlement,
                                    landuse: row.landuse_summary,
                                },
                            });
                        });
                        var featureCollectionObject = {
                            type: "FeatureCollection",
                            features: features,
                        };
                        resolve(featureCollectionObject);
                    }
                });
            })];
    });
}); };
//# sourceMappingURL=Parcel.js.map