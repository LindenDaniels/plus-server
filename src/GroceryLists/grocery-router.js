  
const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const GroceryListService = require('./grocery-service')
//const { isWebUri } = require('valid-url')

const GroceryListRouter = express.Router()
const bodyParser = express.json()

const serializeGroceryList = groceryList => ({
  id: groceryList.id,
  name: xss(groceryList.name)
})


GroceryListRouter
.route('/grocery-lists')

.get((req, res, next) => {
    GroceryListService.getAllGroceryLists(req.app.get('db'))
    .then(groceryList => {
        res.json(groceryList.map(serializeGroceryList))
    })
    .catch(next)
})

module.exports = GroceryListRouter