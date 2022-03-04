"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: false, //Esta propiedad hace que cada setencia SQL que ejecutemos se muestre en consola en produccion no es necesario. 
});
exports.default = db;
//# sourceMappingURL=connection.js.map