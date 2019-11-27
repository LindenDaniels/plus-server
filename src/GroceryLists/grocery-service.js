const GroceryListService = {
    getAllGroceryLists(knex) {
        return knex.select('*').from('grocery_lists');
    }
    
}

module.exports = GroceryListService;