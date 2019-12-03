
  function makeListsArray(name) {
    return [
      {
        id: 1,
        name: 'First test list!',
        items: 
            'Cookies, Milk, Christmas Tree',
        name_id: name[0].id,
      },
      {
        id: 2,
        name: 'Second test list!',
        items: 
            'Makeup, Paper towels, Cheese',
        name_id: name[1].id,
      },
      {
        id: 3,
        name: 'Third test list!',
         items: 'Almond Milk, Almonds, Cashews',
        name_id: name[2].id,
      },
      {
        id: 4,
        name: 'Fourth test list!',
         items: 
            'Macaroni shells, Dog food, Hedgehog food',
        name_id: name[3].id,
      },
    ]
  }
  
  function makeExpectedList(name, list, items=[]) {
    const listName = name
      .find(name => name.id === list.name_id)
  
    const listItems = items
      .filter(item => item.list_id === list.id)
  
    const number_of_items = listItems.length

  
    return {
      id: list.id,
      items: list.items,
      name: list.name,
      number_of_items,
    }
  }
  

  
  function makeExpectedListItems(name, listId, items) {
    const expectedItems = items
      .filter(item => item.list_id === listId)
  
    return expectedItems.map(item => {
      const itemName = name.find(name => name.id === item.name_id)
      return {
        id: item.id,
        name: item.name,
        list: item.list,
        }
      })
    }
  
  function makeMaliciousList(name) {
    const maliciousList = {
      id: 911,
      items: 'Cookies, Milk, Christmas Tree',
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      name_id: name.id,
      items: `Bad items <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    }
    const expectedList = {
      ...makeExpectedList([name], maliciousList),
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      items: `Bad items <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
      maliciousList,
      expectedList,
    }
  }
  
  function makeListsFixtures() {
    const testNames = makeNamesArray()
    const testLists = makeListsArray(testNames)
    const testItems = makeItemsArray(testNames, testLists)
    return { testNames, testLists, testItems }
  }
  
  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        grocery_lists,
        list_name,
        list_items
        RESTART IDENTITY CASCADE`
    )
  }
  
  function seedListsTables(db, name, lists, items=[]) {
    return db
      .into('list_name')
      .insert(name)
      .then(() =>
        db
          .into('grocery_lists')
          .insert(lists)
      )
      .then(() =>
        items.length && db.into('list_items').insert(items)
      )
  }
  
  function seedMaliciousList(db, name, list) {
    return db
      .into('list_name')
      .insert([name])
      .then(() =>
        db
          .into('grocery_lists')
          .insert([list])
      )
  }
  
  module.exports = {
    makeListsArray,
    makeExpectedList,
    makeExpectedListItems,
    makeMaliciousList,
    makeListsFixtures,
    cleanTables,
    seedListsTables,
    seedMaliciousList,
  }