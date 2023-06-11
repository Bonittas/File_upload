import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Data extends Model {
    name: any;
    value: any;
}

Data.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'data'
  }
);

export { sequelize };
