import Sequelize from 'sequelize'
import config from './config'

export const sequelize = new Sequelize.Sequelize(
  config.POSTGRES_DB,
  config.POSTGRES_USER,
  config.POSTGRES_PASSWORD,
  {
    host: config.POSTGRES_HOST,
    // port: Number(config.default.POSTGRES_PORT),
    dialect: 'postgres',
    // logging: false,
  }
)
