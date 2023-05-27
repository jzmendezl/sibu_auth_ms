import { config } from 'dotenv'
config()

export default {
  PORT: process.env.PORT || 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_DB: process.env.POSTGRES_DB || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'postgres',
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
}
