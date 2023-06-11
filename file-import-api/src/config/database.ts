import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('users', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'

});