const express = require('express')
const ListsService = require('./lists-service')

const listsRouter = express.Router()

listsRouter
  .route('/')
  .get((req, res, next) => {
    ListsService.getAllLists(req.app.get('db'))
      .then(lists => {
        res.json(ListsService.serializeLists(lists))
      })
      .catch(next)
  })

listsRouter
  .route('/:list_id')
  .all(checkListExists)
  .get((req, res) => {
    res.json(ListsService.serializeList(res.list))
  })


/* async/await syntax for promises */
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

module.exports = listsRouter