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
     
      .catch(e => {
        console.log(e);
        next(e);
       })
     
    })
  


module.exports = listsRouter