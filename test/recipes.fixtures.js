function makeRecipesArray() {
    return [
      {
        id: 1,
        folderid: 4,
        name: 'Cookies',
        ingredients: 'Almond Milk, Chocolate Chips, Flour',
        instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sed blandit libero volutpat sed. Consectetur libero id faucibus nisl tincidunt eget nullam non. Massa sed elementum tempus egestas. Etiam sit amet nisl purus in mollis nunc. Mi bibendum neque egestas congue quisque egestas. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc eget lorem dolor sed viverra. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Mollis nunc sed id semper risus in. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Mauris sit amet massa vitae tortor condimentum lacinia quis. Metus aliquam eleifend mi in. Id semper risus in hendrerit gravida rutrum quisque non. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Augue interdum velit euismod in. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Faucibus turpis in eu mi bibendum neque. Orci dapibus ultrices in iaculis nunc sed augue. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nec ultrices dui sapien eget mi. Laoreet sit amet cursus sit. A cras semper auctor neque vitae tempus quam pellentesque. Tincidunt lobortis feugiat vivamus at. Urna duis convallis convallis tellus id interdum velit laoreet id. Aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus. Vel pharetra vel turpis nunc eget lorem. Donec adipiscing tristique risus nec feugiat in fermentum. Faucibus scelerisque eleifend donec pretium vulputate sapien. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Sit amet risus nullam eget. Ultrices dui sapien eget mi proin. Accumsan lacus vel facilisis volutpat est velit egestas dui. Mi in nulla posuere sollicitudin aliquam ultrices. Enim tortor at auctor urna nunc id cursus metus aliquam. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas.'
      },
      {
        id: 2,
        folderid: 2,
        name: 'Cheese Sandwich',
        ingredients: 'Cheese, bread, butter',
        instructions: 'First get the butter out so it can soften. Then...'
      },
      {
        id: 3,
        folderid: 5,
        name: 'A sample recipe',
        ingredients: 'Some sample ingredients',
        instructions: 'And some sample instructions'
      },
      {
        id: 4,
        folderid: 1,
        name: 'Muffins',
        ingredients: 'Blueberries, Almond milk, Applesauce, Flour',
        instructions: 'Blend ingredients. Put in oven. Eat leftover batter.'
      },
    ];
  }
  
  function makeMaliciousRecipe() {
    const maliciousRecipe = {
      id: 911,
      folderid: 5,
      name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      ingredients: 'Naughty naughty very naughty <script>alert("xss");</script>',
      instructions: 'Bad script'
      
    }
    const expectedRecipe = {
      ...maliciousRecipe,
      name: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
      ingredients: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      instructions: 'Bad script'
      
    }
    return {
      maliciousRecipe,
      expectedRecipe,
    }
  }
  
  module.exports = {
    makeRecipesArray,
    makeMaliciousRecipe,
  }