require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../config')
const errorHandler = require('../ErrorHandlers/ErrorHandler')
const RecipesRouter = require('../Recipes/recipe-router')
const GroceryListRouter = require('../GroceryLists/lists-router')
const FoldersRouter = require('../Folders/folder-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use('/api/recipes', RecipesRouter)
app.use('/api/lists', GroceryListRouter)
//app.use('/api/folders', FoldersRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app
