const knex = require('knex')
const app = require('../src/App/app')
const { makeRecipesArray, makeMaliciousRecipe } = require('./recipes.fixtures')

describe('Recipe Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('recipes').truncate())

  afterEach('cleanup',() => db('recipes').truncate())

  describe(`GET /api/recipes`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 200 and an empty recipe`, () => {
        return supertest(app)
          .get('/api/recipes')
          .expect(200, [])
      })
    })

    context('Given there are recipes in the database', () => {
      const testRecipes = makeRecipesArray()

      beforeEach('insert recipe', () => {
        return db
          .into('recipes')
          .insert(testRecipes)
      })

      it('responds with 200 and all of the recipes', () => {
        return supertest(app)
          .get('/api/recipes')
          .expect(200, testRecipes)
      })
    })

    context(`Given an XSS attack recipe`, () => {
      const { maliciousRecipe, expectedRecipe } = makeMaliciousRecipe()

      beforeEach('insert malicious recipe', () => {
        return db
          .into('recipes')
          .insert([ maliciousRecipe ])
      })

      it('removes XSS attack ingredients', () => {
        return supertest(app)
          .get(`/api/recipes`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].name).to.eql(expectedRecipe.name)
            expect(res.body[0].folderid).to.eql(expectedRecipe.folderid)
            expect(res.body[0].ingredients).to.eql(expectedRecipe.ingredients)
            expect(res.body[0].instructions).to.eql(expectedRecipe.instructions)
          })
      })
    })
  })

  describe(`GET /api/recipes/:recipe_id`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 404`, () => {
        const recipeId = 123456
        return supertest(app)
          .get(`/api/recipes/${recipeId}`)
          .expect(404, { error: { message: 'Recipe Not Found' } })
      })
    })

    context('Given there are recipes in the database', () => {
      const testRecipes = makeRecipesArray()

      beforeEach('insert recipes', () => {
        return db
          .into('recipes')
          .insert(testRecipes)
      })

      it('responds with 200 and the specified recipe', () => {
        const recipeId = 2
        const expectedRecipe = testRecipes[recipeId - 1]
        return supertest(app)
          .get(`/api/recipes/${recipeId}`)
          .expect(200, expectedRecipe)
      })
    })

    context(`Given an XSS attack recipe`, () => {
      const { maliciousRecipe, expectedRecipe } = makeMaliciousRecipe()

      beforeEach('insert malicious recipe', () => {
        return db
          .into('recipes')
          .insert([ maliciousRecipe ])
      })

      it('removes XSS attack ingredients', () => {
        return supertest(app)
          .get(`/api/recipes/${maliciousRecipe.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.eql(expectedRecipe.name)
            expect(res.body.folderid).to.eql(expectedRecipe.folderid)
            expect(res.body.ingredients).to.eql(expectedRecipe.ingredients)
            expect(res.body.instructions).to.eql(expectedRecipe.instructions)
          })
      })
    })
  })

  describe(`POST /api/recipes`, () => {
    it(`creates a recipe, responding with 201 and the new recipe`, () => {
      const newRecipe = {
        name: 'Test new recipe',
        folderid: 2,
        ingredients: 'Chocolate, Milk, Marshmellows, Graham crackers',
        instructions: 'Lorem'
      }
      return supertest(app)
        .post('/api/recipes')
        .send(newRecipe)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newRecipe.name)
          expect(res.body.ingredients).to.eql(newRecipe.ingredients)
          expect(res.body.instructions).to.eql(newRecipe.instructions)
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('folderid')
          expect(res.headers.location).to.eql(`/api/recipes/${res.body.id}`)
        })
        .then(res =>
          supertest(app)
            .get(`/api/recipes/${res.body.id}`)
            .expect(res.body)
        )
    })

    const requiredFields = ['name', 'folderid', 'ingredients', 'instructions']

    requiredFields.forEach(field => {
      const newRecipe = {
        name: 'Test new recipe',
        folderid: '2',
        ingredients: 
          'Cookies, Almond Milk, Chocolate chips',
        instructions: 'Lorem Christmas New Years'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newRecipe[field]

        return supertest(app)
          .post('/api/recipes')
          .send(newRecipe)
          .expect(400, {
            error: { message: `Field '${field}' is required` }
          })
      })
    })

    it('removes XSS attack ingredients from response', () => {
      const { maliciousRecipe, expectedRecipe } = makeMaliciousRecipe()
      return supertest(app)
        .post(`/api/recipes`)
        .send(maliciousRecipe)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(expectedRecipe.name)
          expect(res.body.folderid).to.eql(expectedRecipe.folderid)
          expect(res.body.ingredients).to.eql(expectedRecipe.ingredients)
          expect(res.body.instructions).to.eql(expectedRecipe.instructions)
        })
    })
  })

  describe(`DELETE /api/recipes/:recipe_id`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 404`, () => {
        const recipeId = 123456
        return supertest(app)
          .delete(`/api/recipes/${recipeId}`)
          .expect(404, { error: { message: 'Recipe Not Found' } })
      })
    })

    context('Given there are recipes in the database', () => {
      const testRecipes = makeRecipesArray()

      beforeEach('insert recipes', () => {
        return db
          .into('recipes')
          .insert(testRecipes)
      })

      it('responds with 204 and removes the recipe', () => {
        const idToRemove = 2
        const expectedRecipes = testRecipes.filter(recipe => recipe.id !== idToRemove)
        return supertest(app)
          .delete(`/api/recipes/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/recipes`)
              .expect(expectedRecipes)
          )
      })
    })
  })

  describe(`PATCH /api/recipes/:recipe_id`, () => {
    context(`Given no recipes`, () => {
      it(`responds with 404`, () => {
        const recipeId = 123456
        return supertest(app)
          .delete(`/api/recipes/${recipeId}`)
          .expect(404,  { error: { message: 'Recipe Not Found' } }
                )
      })
    })

    context('Given there are recipes in the database', () => {
      const testRecipes = makeRecipesArray()

      beforeEach('insert recipes', () => {
        return db
          .into('recipes')
          .insert(testRecipes)
      })

      it('responds with 204 and updates the recipe', () => {
        const idToUpdate = 2
        const updateRecipe = {
          name: 'updated recipe name',
          ingredients: 
            'Cookies, Almond Milk, Cheesecake, Chocolate chips',
          instructions: 'Lorem ipsum cheese'
        }
        const expectedRecipe = {
          ...testRecipes[idToUpdate - 1],
          ...updateRecipe
        }
        return supertest(app)
          .patch(`/api/recipes/${idToUpdate}`)
          .send(updateRecipe)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/recipes/${idToUpdate}`)
              .expect(expectedRecipe)
          )
      })

      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2
        return supertest(app)
          .patch(`/api/recipes/${idToUpdate}`)
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must contain fields name, ingredients, and instructions.`
            }
          })
      })

      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2
        const updateRecipe = {
          name: 'updated recipe name',
        }
        const expectedRecipe = {
          ...testRecipes[idToUpdate - 1],
          ...updateRecipe
        }

        return supertest(app)
          .patch(`/api/recipes/${idToUpdate}`)
          .send({
            ...updateRecipe,
            fieldToIgnore: 'should not be in GET response'
          })
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/recipes/${idToUpdate}`)
              .expect(expectedRecipe)
          )
      })
    })
  })
})