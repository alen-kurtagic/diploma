"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("./middlewares/cors");
var logger_1 = require("./middlewares/logger");
var parcels_1 = __importDefault(require("./routes/parcels"));
var streets_1 = __importDefault(require("./routes/streets"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(cors_1.cors);
app.use(logger_1.logger);
app.use(parcels_1.default);
app.use(streets_1.default);
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening on port 3000");
});
//# sourceMappingURL=index.js.map