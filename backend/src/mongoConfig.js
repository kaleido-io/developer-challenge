"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// DECLARE ALL VARIABLES
var MONGO_DB_USER = process.env.MONGO_DB_USER || '';
var NODE_ENV = process.env.NODE_ENV || '';
var MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
var SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
var MONGO_URL_LOCAL = "mongodb+srv://".concat(MONGO_DB_USER, ":").concat(MONGO_DB_PASSWORD, "@cluster0.xgqwh.mongodb.net/node_boilerplate");
//CREATE CONFIG OBJECT
var config = {
    mongo: {
        url: MONGO_URL_LOCAL,
    },
    server: {
        port: SERVER_PORT,
    },
};
//EXPORT
exports.default = config;
//# sourceMappingURL=mongoConfig.js.map