"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var date_fns_1 = require("date-fns");
var logger = function (req, res, next) {
    var start = Date.now();
    var ip = req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;
    res.on("finish", function () {
        var elapsed = Date.now() - start;
        var timestamp = (0, date_fns_1.format)(new Date(), "dd.MM.yyyy HH:mm");
        console.log("[".concat(timestamp, "] ").concat(res.statusCode, " ").concat(ip, " ").concat(req.method, " ").concat(req.originalUrl, " ").concat(elapsed, "ms"));
    });
    next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map