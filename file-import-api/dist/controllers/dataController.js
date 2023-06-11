"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataController = void 0;
const dataModel_1 = require("../models/dataModel");
class dataController {
    getAllData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dataModel_1.Data.findAll();
                res.json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    }
    createData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, value } = req.body;
            try {
                const data = yield dataModel_1.Data.create({ name, value });
                res.json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    }
    updateData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { name, value } = req.body;
            try {
                const data = yield dataModel_1.Data.findByPk(id);
                if (!data) {
                    return res.status(404).json({ message: 'Data Not Found' });
                }
                data.name = name;
                data.value = value;
                yield data.save();
                res.json(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    }
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const data = yield dataModel_1.Data.findByPk(id);
                if (!data) {
                    return res.status(404).json({ message: 'Data Not Found' });
                }
                yield data.destroy();
                res.json({ message: 'Data Deleted' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server Error' });
            }
        });
    }
}
exports.dataController = dataController;
