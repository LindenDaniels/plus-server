const express = require('express');
const knex = require('knex')
const app = require('./App/app')

const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})

const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})