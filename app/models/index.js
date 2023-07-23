import { DB, DIALECT, HOST, PASSWORD, poolOptions, PORT, USER } from '../../db.config.js'
import { Sequelize } from 'sequelize'
import { getRecipeModel } from './recipe.model.js'

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
  pool: poolOptions,
  dialectOptions: {
    ssl: true
  }
})

const models = {
  sequelize,
  Sequelize,
  Recipe: getRecipeModel(sequelize, Sequelize)
}
export default models
