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

  
  serializeLists(Lists) {
    return Lists.map(this.serializeList)
  },

  serializeList(List) {
    const ListTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const ListData = ListTree.grow([ List ]).getData()[0]

    return {
      id: ListData.id,
      name: xss(ListData.title),
      items: xss(ListData.content),
    }
  },
}


module.exports = ListsService