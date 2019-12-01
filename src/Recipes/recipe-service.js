const xss = require('xss')
const Treeize = require('treeize')

const RecipeService = {
  getAllRecipe(db) {
    return db
      .from('recipes')
      .select(
        'recipes.id',
        'recipes.name',
        'recipes.ingredients',
        'recipes.instructions'
      )
        
  },

  getById(db, id) {
    return RecipeService.getAllRecipes(db)
      .where('recipes.id', id)
      .first()
  },

  insertRecipe(knex, newRecipe) {
    return knex
      .insert(newRecipe)
      .into('recipes')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  
  serializeRecipe(recipes) {
    return recipes.map(this.serializeRecipe)
  },

  serializeRecipe(recipe) {
    const recipeTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const recipeData = recipeTree.grow([ recipe ]).getData()[0]

    return {
      id: recipeData.id,
      name: xss(recipeData.name),
      ingredients: xss(recipeData.ingredients),
      instructions: xss(recipeData.instructions)
    }
  },
}


module.exports = RecipeService