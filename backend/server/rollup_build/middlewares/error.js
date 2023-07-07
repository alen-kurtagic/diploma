"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var errorHandler = function (error, req, res, next) {
    console.error(error);
    if (error instanceof TypeError) {
        res.status(400).send(error.message);
    }
    else if (error instanceof Error) {
        res.status(500).send(error.message);
    }
};
router.use(errorHandler);
//# sourceMappingURL=error.js.map