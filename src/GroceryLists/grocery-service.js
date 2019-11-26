const GroceryListService = {
    getAllGroceryLists(knex) {
        return knex.select('*').from('grocery-lists');
    }
    
}