import { config } from 'dotenv'

config()
export const HOST = process.env.DATABASE_LOCAL_HOST || process.env.DATABASE_HOST
export const USER = process.env.DATABASE_LOCAL_USER || process.env.DATABASE_USER
export const PASSWORD = process.env.DATABASE_LOCAL_PASSWORD || process.env.DATABASE_PASSWORD
export const DB = process.env.DATABASE_LOCAL_DB || process.env.DATABASE_DB
export const DIALECT = process.env.DATABASE_LOCAL_DIALECT || process.env.DATABASE_DIALECT
export const PORT = process.env.DATABASE_LOCAL_PORT || process.env.DATABASE_PORT

export const poolOptions = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
}
