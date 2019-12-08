const knex = require('knex')
const app = require('./App/app')

const { PORT, DATABASE_URL, API_BASE_URL  } = require('./config')

const db = knex({
  client: 'pg',
  connection: API_BASE_URL,
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