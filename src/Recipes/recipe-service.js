const xss = require('xss')
const Treeize = require('treeize')

const RecipeService = {
  getAllRecipes(db) {
    return db
      .from('recipes')
      .select(
        'recipes.id',
        'recipes.folderid',
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

  deleteRecipe(knex, id) {
    return knex('recipes')
      .where({ id })
      .delete();
  },

  updateRecipe(knex, id, newRecipeFields) {
    return knex('recipes')
      .where({ id })
      .update(newRecipeFields);
  },

  
  serializeRecipes(recipes) {
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
      folderid: recipeData.folderid,
      name: xss(recipeData.name),
      ingredients: xss(recipeData.ingredients),
      instructions: xss(recipeData.instructions)
    }
  },
}


module.exports = RecipeService