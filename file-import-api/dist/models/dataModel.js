"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Data = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
class Data extends sequelize_1.Model {
}
exports.Data = Data;
Data.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'data'
});
