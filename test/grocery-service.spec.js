require('dotenv').config();
const knex = require('knex');

const ListService = require('../src/GroceryLists/grocery-service');

describe('Grocery service object', function() {
  let db;

  let testLists = [
    {
      name: 'Christmas',
      id: 1
    },
    {
      name: 'Potluck',
      id: 2
    },
    {
      name: 'Back to school',
      id: 3
    }
  ];

  let newList =  { id: 4, name: 'Thanksgiving' } ;

  

  before('Get database instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
  });

  after('Close database', () => {
    db.destroy();
  });

 beforeEach('Reset the test database', () => {
    return db.raw('TRUNCATE grocery_lists RESTART IDENTITY CASCADE')
  });

  beforeEach('Insert test data into grocery_list table', () => {
    return db.into('').insert(testLists);
  });

  describe('getAllLists', () => {
    it('returns all lists from grocery lists table', () => {
      return ListService.getAllLists(db).then(lists => {
        expect(lists).to.have.deep.members(testLists);
      });
    });
  })

  describe('addList', () => {
    it('should add a list to the grocery list table', () => {
      return ListService.insertList(db, newList).then(list => {
        expect(list).to.eql(newList);
      });
    });
  });
});
