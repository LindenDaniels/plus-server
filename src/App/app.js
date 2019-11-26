require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const RecipesRouter = require('./Recipes/recipe-router')
const GroceryListRouter = require('./GroceryLists/grocery-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(cors())
app.use(helmet())

app.use('/api/recipes', RecipesRouter)
app.use('/api/grocery-lists', GroeryListRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app
