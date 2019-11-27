require('dotenv').config();
const knex = require('knex');

const GroceryListService = require('../src/GroceryLists/grocery-service');

describe('Grocery service object', function() {
  let db;

  let testGroceryLists = [
    {
      list_name: 'Christmas',
      id: 1
    },
    {
      list_name: 'Thanksgiving',
      id: 2
    },
    {
      list_name: 'Halloween',
      id: 3
    }
  ];

  //let newGroceryList =  { id: 4, folder_name: 'Grocery' } ;

  before('Get database instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
  });

  after('Close database', () => {
    db.destroy();
  });

  //beforeEach('Reset the test database', () => {
    //return db.raw('TRUNCATE grocery_lists RESTART IDENTITY CASCADE')
  //});

  //beforeEach('Insert test data into grocery-list table', () => {
    //return db.into('').insert(testFolders);
  //});

  describe('getAllGroceryLists', () => {
    it('it returns all lists from grocery lists table', () => {
      return GroceryListService.getAllGroceryLists(db).then(grocerylists => {
        expect(grocerylists).to.have.deep.members(testGroceryLists);
      });
    });
  })
});
