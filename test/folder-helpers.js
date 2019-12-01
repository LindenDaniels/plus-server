
  function makeFoldersArray(name) {
    return [
      {
        id: 1,
        name: 'First test folder!',
        folderid: folder[0].id,
      },
      {
        id: 2,
        name: 'Second test folder!',
      },
      {
        id: 3,
        name: 'Third test folder!',
      },
      {
        id: 4,
        name: 'Fourth test folder!',
      },
    ]
  }
  

  
  function makeExpectedFolder(name, folder, recipes=[]) {
    const name = name
      .find(name => name.id === folder.name_id)
  
    const folderFolders = recipes
      .filter(recipe => recipe.folder_id === folder.id)
  
    const number_of_recipes = folderFolders.length

  
    return {
      id: folder.id,
      recipes: folder.recipes,
      name: folder.name,
      number_of_recipes,
    }
  }
  

  
  function makeExpectedFolder(name, folderId) {
    const expectedFolders = folders
      .filter(folder => folder.id === folderId)
  
    return expectedFolders.map(recipe => {
      const folderName = name.find(name => name.id === folder.name_id)
      return {
        id: recipe.id,
        name: folder.name,
        }
      })
    }
  
  function makeMaliciousFolder(name) {
    const maliciousFolder = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script> Bad name <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.',
      name_id: name.id,
    }
    const expectedFolder = {
      ...makeExpectedFolder([name], maliciousFolder),
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt; Bad name <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.',
    }
    return {
      maliciousFolder,
      expectedFolder,
    }
  }
  
  function makeFoldersFixtures() {
    const testNames = makeNamesArray()
    const testFolders = makeFoldersArray(testNames)
    return { testNames, testFolders }
  }
  
  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        folders
        RESTART IDENTITY CASCADE`
    )
  }
  
  function seedFoldersTable(db, name, folders, recipes=[]) {
    return db
      .into('name')
      .insert(name)
      .then(() =>
        db
          .into('folders')
          .insert(folders)
      )
      .then(() =>
        recipes.length && db.into('folder_recipes').insert(recipes)
      )
  }
  
  function seedMaliciousFolder(db, name, folder) {
    return db
      .into('name')
      .insert([name])
      .then(() =>
        db
          .into('folders')
          .insert([folder])
      )
  }
  
  module.exports = {
    makeFoldersArray,
    makeExpectedFolder,
    makeExpectedFolder,
    makeMaliciousFolder,
    makeFoldersFixtures,
    cleanTables,
    seedFoldersTable,
    seedMaliciousFolder,
  }