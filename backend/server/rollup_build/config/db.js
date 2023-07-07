"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = exports.PGSQL_PORT = exports.PORT = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    debug: true,
    path: "./../.env",
});
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var PGSQL_PORT = Number(process.env.PGSQL_PORT) || 5432;
exports.PGSQL_PORT = PGSQL_PORT;
var DB_CONFIG = {
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: PGSQL_PORT,
};
exports.DB_CONFIG = DB_CONFIG;
//# sourceMappingURL=db.js.map