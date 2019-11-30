const xss = require('xss')
const Treeize = require('treeize')

const ListsService = {
  getAllLists(db) {
    return db
      .from('grocery_lists AS gls')
      .select(
        'gls.id',
        'gls.name',
        'gls.items',
      )
        
  },

  getById(db, id) {
    return ListsService.getAllLists(db)
      .where('gls.id', id)
      .first()
  },

  
  serializeLists(lists) {
    return lists.map(this.serializeList)
  },

  serializeList(list) {
    const listTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const listData = listTree.grow([ list ]).getData()[0]

    return {
      id: listData.id,
      name: xss(listData.name),
      items: xss(listData.items),
    }
  },
}


module.exports = ListsService