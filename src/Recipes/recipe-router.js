const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const RecipeService = require('./recipe-service')
//const { isWebUri } = require('valid-url')

const RecipeRouter = express.Router()
const bodyParser = express.json()

const serializeRecipe = recipe => ({
  id: recipe.id,
  name: xss(recipe.name),
  ingredients: xss(recipe.ingredients),
  instructions: xss(recipe.instructions)
})


RecipeRouter
.route('/')

.get((req, res, next) => {
    RecipeService.getAllRecipes(req.app.get('db'))
    .then(recipe => {
        res.json(recipe.map(serializeRecipe))
    })
    .catch(next)
})

.post(bodyParser, (req, res, next) => {
  const { id, name, ingredients, instructions } = req.body;
  const newRecipe = { id, name, ingredients, instructions }


for (const field of ['name, ingredients, instructions']) {
  if (!newRecipe[field]) {
    logger.error(`${field} is required`)
    return res.status(400).send({
      error: { message: `'${field}' is required` }
    })
  }
}


RecipeService.insertRecipe(
  req.app.get('db'),
  newRecipe
)
  .then(recipe => {
    logger.info(`Recipe with id ${recipe.id} created.`)
    res
      .status(201)
      .location(path.posix.join(req.originalUrl, `${recipe.id}`))
      .json(serializeRecipe(recipe))
  })
  .catch(next)

})

RecipeRouter
  .route('/:recipe_id')

  .all((req, res, next) => {
    const { recipe_id } = req.params
    RecipeService.getById(req.app.get('db'), recipe_id)
      .then(recipe => {
        if (!recipe) {
          logger.error(`Recipe with id ${recipe} not found.`)
          return res.status(404).json({
            error: { message: `Recipe Not Found` }
          })
        }

        res.recipe = recipe
        next()
      })
      .catch(next)

  })

  .get((req, res) => {
    res.json(serializeRecipe(res.recipe))
  })

  .delete((req, res, next) => {
    const { recipe_id } = req.params
    RecipeService.deleteRecipe(
      req.app.get('db'),
      recipe_id
    )
      .then(numRowsAffected => {
        logger.info(`Recipe with id ${recipe_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(bodyParser, (req, res, next) => {
    const { name, ingredients, instructions } = req.body
    const recipeToUpdate = { name, instructions, ingredients }

    const numberOfValues = Object.values(recipeToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'name'.`
        }
      })
    }

    RecipeService.updateRecipe(
      req.app.get('db'),
      req.params.Recipe_id,
      recipeToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


module.exports = RecipeRouter