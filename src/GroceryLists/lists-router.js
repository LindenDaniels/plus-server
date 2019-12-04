const express = require('express')
const path = require('path')
const ListsService = require('./lists-service')
const logger = require('../logger')
const bodyParser = express.json()
const listsRouter = express.Router()

listsRouter
  .route('/')
  .get((req, res, next) => {
    ListsService.getAllLists(req.app.get('db'))
      .then(lists => {
        res.json(ListsService.serializeLists(lists))
      })
      console.log(lists)
      .catch(next)
     
    })
  .post(bodyParser, (req, res, next) => {
    const { id, name, items } = req.body;
    const newList = { id, name, items }
  
  for (const field of ['name', 'items']) {
    if (!newList[field]) {
      logger.error(`Missing ${field} in request body`)
      return res.status(400).send({
        error: { message: `Missing '${field}' in request body` }
      })
    }
  }
  
  ListsService.insertList(
    req.app.get('db'),
    newList
  )
    .then(list => {
      logger.info(`Grocery list with id ${list.id} created.`)
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `${list.id}`))
        .json(ListsService.serializeList(list))
    })
    .catch(next)
  
  })

  async function checkListExists(req, res, next) {
    try {
      const list = await ListsService.getById(
        req.app.get('db'),
        req.params.list_id
      )
  
      if (!list)
        return res.status(404).json({
          error: `Grocery list doesn't exist`
        })
  
      res.list = list
      next()
    } catch (error) {
      next(error)
    }
  }

listsRouter
  .route('/:list_id')
  .all(checkListExists)
  .get((req, res) => {
    res.json(ListsService.serializeList(res.list))
  })

  .delete((req, res, next) => {
    const { list_id } = req.params
    ListsService.deleteList(
      req.app.get('db'),
      list_id
    )
      .then(numRowsAffected => {
        logger.info(`Grocery list with id ${list_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(bodyParser, (req, res, next) => {
    const { name, items } = req.body
    const listToUpdate = { name, items }

    const numberOfValues = Object.values(listToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: {
          message: `Request body must contain name and items.`
        }
      })
    }

    ListsService.updateList(
      req.app.get('db'),
      req.params.list_id,
      listToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })


module.exports = listsRouter