import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './models/dataModel';
import { dataRoutes } from './routes/dataRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});