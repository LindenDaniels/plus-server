function makeFoldersArray() {
    return [
      {
        id: 1,
        name: 'Breakfast',
      },
      {
        id: 2,
        name: 'Lunch',
      },
      {
        id: 3,
        name: 'Dinner',
      },
      {
        id: 4,
        name: 'Dessert',
      },
    ];
  }
  
  function makeMaliciousFolder() {
    const maliciousFolder = {
      id: 911,
      name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad. Naughty naughty very naughty <script>alert("xss");</script>`,
    }
    const expectedFolder = {
      ...maliciousFolder,
      name: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad. Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;`, 
    }
    return {
      maliciousFolder,
      expectedFolder,
    }
  }
  
  module.exports = {
    makeFoldersArray,
    makeMaliciousFolder,
  }