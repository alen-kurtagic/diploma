"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
var db_1 = require("src/config/db");
var pool = new pg_1.Pool(db_1.DB_CONFIG);
exports.pool = pool;
//# sourceMappingURL=connection.js.map