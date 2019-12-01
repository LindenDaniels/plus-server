
  function makeRecipesArray(name) {
    return [
      {
        id: 1,
        name: 'First test recipe!',
        ingredients: 
            'Flour, Sugar, Milk',
        name_id: name[0].id,
        folderid: folder[1].id,
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: 2,
        name: 'Second test recipe!',
        ingredients: 
            'Cheese, Bread, Butter',
        name_id: name[1].id,
        folderid: folder[3].id,
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: 3,
        name: 'Third test recipe!',
         ingredients: 
            'Almond Milk, Almonds, Cashews',
        name_id: name[2].id,
        folderid: folder[4].id,
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: 4,
        name: 'Fourth test recipe!',
         ingredients: 
            'Kale, Protein powder, Spinach, Orange',
            folderid: folder[5].id,
            name_id: name[3].id,
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
    ]
  }
  

  
  function makeExpectedRecipe(name, folderid, ingredients, instructions) {
    const name = name
      .find(name => name.id === recipe.name_id)
    
    const folderid = folderid
      .find(folder => folder.id === recipe.folder_id)
    
    const recipeInstructions = instructions
    .find(instructions => instructions.id === recipe.instructions_id)
  
    const recipeIngredients = ingredients
      .filter(ingredient => ingredient.recipe_id === recipe.id)
  
    const number_of_ingredients = recipeIngredients.length

  
    return {
      id: recipe.id,
      folderid: recipe.folderid,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      name: recipe.name,
      number_of_ingredients,
      name: {
        id: name.id,
      },
    }
  }
  

  
  function makeExpectedRecipeIngredients(name, recipeId, ingredients, instructions) {
    const expectedIngredients = ingredients
      .filter(ingredient => ingredient.recipe_id === recipeId)
  
    return expectedIngredients.map(ingredient => {
      const ingredientName = name.find(name => name.id === ingredient.name_id)
      return {
        id: ingredient.id,
        name: ingredient.name,
        recipe: ingredient.recipe,
        }
      })
    }
  
  function makeMaliciousRecipe(name) {
    const maliciousRecipe = {
      id: 911,
      ingredients: 
            'Spaghetti sauce, Cheese, Noodles',
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      folderid: recipe.folderid,
      ingredients: `Bad ingredients <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    }
    const expectedRecipe = {
      ...makeExpectedRecipe([name], maliciousRecipe),
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      folderid: recipe.folderid,
      ingredients: `Bad ingredients <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
      maliciousRecipe,
      expectedRecipe,
    }
  }
  
  function makeRecipesFixtures() {
    const testNames = makeNamesArray()
    const testRecipes = makeRecipesArray(testNames)
    const testIngredients = makeIngredientsArray(testNames, testRecipes)
    return { testNames, testRecipes, testIngredients }
  }
  
  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        recipes,
        recipe_name,
        recipe_ingredients,
        recipe_instructions,
        RESTART IDENTITY CASCADE`
    )
  }
  
  function seedRecipesTables(db, name, folderid, instructions, ingredients) {
    return db
      .into('name')
      .insert(name)
      .into('folderid')
      .insert(folderid)
      .into('instructions')
      .insert(instructions)
      .then(() =>
        db
          .into('recipes')
          .insert(recipes)
      )
      .then(() =>
        ingredients.length && db.into('ingredients').insert(ingredients)
      )
  }
  
  function seedMaliciousRecipe(db, name, recipe) {
    return db
      .into('name')
      .insert([name])
      .then(() =>
        db
          .into('recipes')
          .insert([recipe])
      )
  }
  
  module.exports = {
    makeRecipesArray,
    makeExpectedRecipe,
    makeExpectedRecipeIngredients,
    makeMaliciousRecipe,
    makeRecipesFixtures,
    cleanTables,
    seedRecipesTables,
    seedMaliciousRecipe,
  }