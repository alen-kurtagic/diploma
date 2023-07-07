"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBbox = exports.formatBbox = void 0;
var formatBbox = function (bbox) {
    try {
        var _a = bbox.split(",").map(Number), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return sortBbox([x1, y1, x2, y2]);
    }
    catch (error) {
        throw new TypeError("Incorect bbox parameter");
    }
};
exports.formatBbox = formatBbox;
var sortBbox = function (bbox) {
    try {
        var x1 = bbox[0], y1 = bbox[1], x2 = bbox[2], y2 = bbox[3];
        var minX = Math.min(x1, x2);
        var maxX = Math.max(x1, x2);
        var minY = Math.min(y1, y2);
        var maxY = Math.max(y1, y2);
        return [minX, minY, maxX, maxY];
    }
    catch (error) {
        throw new TypeError("Incorect bbox parameter");
    }
};
exports.sortBbox = sortBbox;
//# sourceMappingURL=bbox.js.map