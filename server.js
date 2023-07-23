import express from 'express'
import cors from 'cors'
import models from './app/models/index.js'
import recipesRoutes from './app/routes/recipes.routes.js'
import { populateRecipeDatabaseAtStart } from './app/controllers/recipe.controller.js'

const app = express()

const corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(recipesRoutes)

const eraseDatabaseOnSync = true

models.sequelize.sync({ force: eraseDatabaseOnSync })
  .then(() => {
    console.log('synced db.')
    console.log('Drop and re-sync db.')
    if (eraseDatabaseOnSync) {
      populateRecipeDatabaseAtStart()
    }
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

app.get('/', (req, res) => {
  res.status(404).send()
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
