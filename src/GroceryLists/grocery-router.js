  
const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const ListService = require('./grocery-service')
//const { isWebUri } = require('valid-url')

const GroceryListRouter = express.Router()
const bodyParser = express.json()

const serializeList = list => ({
  id: list.id,
  name: xss(list.name)
})


GroceryListRouter
.route('/')

.get((req, res, next) => {
    ListService.getAllLists(req.app.get('db'))
    .then(list => {
        res.json(list.map(serializeList))
    })
    .catch(next)
})

.post(bodyParser, (req, res, next) => {
  const { id, name } = req.body;
  const newList = { id, name }


for (const field of ['name']) {
  if (!newList[field]) {
    logger.error(`${field} is required`)
    return res.status(400).send({
      error: { message: `'${field}' is required` }
    })
  }
}


ListService.insertList(
  req.app.get('db'),
  newList
)
  .then(list => {
    logger.info(`Grocery list with id ${list.id} created.`)
    res
      .status(201)
      .location(path.posix.join(req.originalUrl, `${list.id}`))
      .json(serializeList(list))
  })
  .catch(next)

})

GroceryListRouter
  .route('/:list_id')

  .all((req, res, next) => {
    const { list_id } = req.params
    ListService.getById(req.app.get('db'), list_id)
      .then(list => {
        if (!list) {
          logger.error(`Grocery list with id ${list} not found.`)
          return res.status(404).json({
            error: { message: `List Not Found` }
          })
        }

        res.list = list
        next()
      })
      .catch(next)

  })

  .get((req, res) => {
    res.json(serializeList(res.list))
  })

  .delete((req, res, next) => {
    const { list_id } = req.params
    ListService.deleteList(
      req.app.get('db'),
      list_id
    )
      .then(numRowsAffected => {
        logger.info(`List with id ${list_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = GroceryListRouter