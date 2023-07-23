import { Router } from 'express'
import {
  recipeCreate,
  recipeDelete,
  recipeFindAll,
  recipeFindOne,
  recipeUpdate
} from '../controllers/recipe.controller.js'

const router = Router()

router.post('/recipes', recipeCreate)

router.get('/recipes', recipeFindAll)

router.get('/recipes/:id', recipeFindOne)

router.patch('/recipes/:id', recipeUpdate)

router.delete('/recipes/:id', recipeDelete)

export default router
