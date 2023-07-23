import models from '../models/index.js'

const Recipes = models.Recipe
const Op = models.Sequelize.Op

export const recipeCreate = async (req, res) => {
  if (!req.body.title || !req.body.making_time || !req.body.serves || !req.body.ingredients || (!req.body.cost && typeof req.body.cost === 'number')) {
    res.status(404).send({
      message: 'Recipe creation failed!', required: 'title, making_time, serves, ingredients, cost'
    })
    return
  }

  const recipe = {
    title: req.body.title,
    making_time: req.body.making_time,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    cost: req.body.cost
  }

  Recipes.create(recipe)
    .then(data => res.send({
      message: 'Recipe successfully created!', recipe: [data]
    }))
    .catch(() => res.status(404).send({
      message: 'Recipe creation failed!', required: 'title, making_time, serves, ingredients, cost'
    }))
}

export const recipeFindAll = async (req, res) => {
  Recipes.findAll({ order: [['id', 'ASC']] })
    .then(data => res.send({ recipes: data }))
    .catch(() => res.status(404).send({
      message: 'data not found'
    }))
}

export const recipeFindOne = async (req, res) => {
  let id = req.params.id

  if (!id || id < 1) {
    id = 1
  }

  Recipes.findByPk(id)
    .then(data => {
      if (data !== null) {
        res.send({
          message: 'Recipe details by id', recipe: [data]
        })
      } else {
        throw new Error()
      }
    })
    .catch(() => res.status(404).send({
      message: 'data not found'
    }))
}

export const recipeUpdate = async (req, res) => {
  const id = req.params.id
  if (!req.body) {
    res.status(404).send({
      message: 'Recipe could not be updated'
    })
    return
  }

  const recipeUpdateData = {
    title: req.body.title,
    making_time: req.body.making_time,
    serves: req.body.serves,
    ingredients: req.body.ingredients,
    cost: req.body.cost
  }

  Recipes.update({ ...recipeUpdateData, updated_at: models.sequelize.literal('CURRENT_TIMESTAMP') }, {
    where: { id: { [Op.eq]: id } }
  })
    .then(affectedCounts => {
      if (affectedCounts[0] === 1) {
        res.send({
          message: 'Recipe successfully updated!', recipe: recipeUpdateData
        })
      } else {
        throw Error('Was now updated the data')
      }
    })
    .catch(err => {
      console.log(err)
      res.status(404).send({
        message: 'data not found'
      })
    })
}

export const recipeDelete = (req, res) => {
  const id = req.params.id
  if (!id || id < 1) {
    res.status(404).send({
      message: 'Id not recognized'
    })
    return
  }
  Recipes.destroy({ where: { id: { [Op.eq]: id } } })
    .then(affectedCount => {
      if (affectedCount >= 1) {
        res.send({
          message: 'Recipe successfully removed!'
        })
      } else {
        throw Error('No recipe found')
      }
    })
    .catch(() => res.status(404).send({ message: 'No recipe found' }))
}

export const populateRecipeDatabaseAtStart = async () => {
  const recipeId1 = {
    title: 'Chicken Curry',
    making_time: '45 min',
    serves: '4 people',
    ingredients: 'onion, chicken, seasoning',
    cost: 1000,
    created_at: '2016-01-11 13:10:12',
    updated_at: '2016-01-11 13:10:12'
  }
  const recipeId2 = {
    title: 'Rice Omelette',
    making_time: '30 min',
    serves: '2 people',
    ingredients: 'onion, egg, seasoning, soy sauce',
    cost: 700,
    created_at: '2016-01-11 13:10:12',
    updated_at: '2016-01-11 13:10:12'
  }
  await Recipes.create(recipeId1)
  await Recipes.create(recipeId2)
}
