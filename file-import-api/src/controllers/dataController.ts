import { Request, Response } from 'express';
import { Data } from '../models/dataModel';

export class dataController {
  public async getAllData(req: Request, res: Response) {
    try {
      const data = await Data.findAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  public async createData(req: Request, res: Response) {
    const { name, value } = req.body;
    try {
      const data = await Data.create({ name, value });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  public async updateData(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, value } = req.body;
    try {
      const data = await Data.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: 'Data Not Found' });
      }
      data.name = name;
      data.value = value;
      await data.save();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  public async deleteData(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const data = await Data.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: 'Data Not Found' });
      }
      await data.destroy();
      res.json({ message: 'Data Deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}