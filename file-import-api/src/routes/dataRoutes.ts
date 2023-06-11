import express from 'express';
import { dataController } from '../controllers/dataController'

export const dataRoutes = express.Router();

const controller = new dataController();

dataRoutes.get('/', controller.getAllData);
dataRoutes.post('/', controller.createData);
dataRoutes.put('/:id', controller.updateData);
dataRoutes.delete('/:id', controller.deleteData);