const knex = require('knex')
const app = require('./App/app')

const { PORT, DATABASE_URL, API_BASE_URL  } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
  "pool": {
    "min": 2,
     max: 50,
    "createTimeoutMillis": 3000,
    "acquireTimeoutMillis": 30000,
    "idleTimeoutMillis": 30000,
    "reapIntervalMillis": 1000,
    "createRetryIntervalMillis": 100,
    "propagateCreateError": false // <- default is true, set to false
  },
})

console.log(db);

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