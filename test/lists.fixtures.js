function makeListsArray() {
    return [
      {
        id: 1,
        name: 'Christmas',
        items: [
            'Cookies', 'Almond Milk', 'Wrapping Paper', 'Chocolate chips'
        ]
      },
      {
        id: 2,
        name: 'Thanksgiving',
        items: [
            'Turkey', 'Centerpiece', 'Decorations', 'Mac and cheese'
        ]
      },
      {
        id: 3,
        name: 'Gifts',
        items: [
            'Excavator', 'Pikachu', 'Magnatiles', 'STEM game'
        ]
      },
      {
        id: 4,
        name: 'Muffins',
        items: [
            'Blueberries', 'Almond milk', 'Applesauce', 'Flour'
        ]
      },
    ];
  }
  
  function makeMaliciousList() {
    const maliciousList = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      items: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
    }
    const expectedList = {
      ...maliciousList,
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      items: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
      maliciousList,
      expectedList,
    }
  }
  
  module.exports = {
    makeListsArray,
    makeMaliciousList,
  }