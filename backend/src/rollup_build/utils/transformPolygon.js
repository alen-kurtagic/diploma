"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPolygonCoordinates = void 0;
var projectionDefinitions_1 = __importDefault(require("src/utils/projectionDefinitions"));
var transformPolygonCoordinates = function (polygon, sourceProjection, targetProjection) {
    var transformedPolygon = {
        type: "Polygon",
        coordinates: polygon.coordinates.map(function (ring) {
            return ring.map(function (coordinate) {
                return (0, projectionDefinitions_1.default)(sourceProjection, targetProjection, coordinate);
            });
        }),
    };
    return transformedPolygon;
};
exports.transformPolygonCoordinates = transformPolygonCoordinates;
//# sourceMappingURL=transformPolygon.js.map