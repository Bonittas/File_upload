"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
exports.dataRoutes = express_1.default.Router();
const controller = new dataController_1.dataController();
exports.dataRoutes.get('/', controller.getAllData);
exports.dataRoutes.post('/', controller.createData);
exports.dataRoutes.put('/:id', controller.updateData);
exports.dataRoutes.delete('/:id', controller.deleteData);
