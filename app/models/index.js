import { DB, DIALECT, HOST, PASSWORD, poolOptions, PORT, USE_SSL, USER } from '../../db.config.js'
import { Sequelize } from 'sequelize'
import { getRecipeModel } from './recipe.model.js'

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  pool: poolOptions,
  dialectOptions: {
    ssl: USE_SSL
  }
})

const models = {
  sequelize,
  Sequelize,
  Recipe: getRecipeModel(sequelize, Sequelize)
}
export default models
