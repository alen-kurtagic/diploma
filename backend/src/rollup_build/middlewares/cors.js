"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
var cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
};
exports.cors = cors;
//# sourceMappingURL=cors.js.map