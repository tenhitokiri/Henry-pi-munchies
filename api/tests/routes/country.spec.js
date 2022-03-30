/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  "summary": "Un resumen de lo que hay que hacer, si quieres",
  "healthScore": 25,
  "spoonacularScore": 45,
  "steps": "a bunch of useless steps",
  "image": "https://imgs.search.brave.com/KreC1aqjr0VDlaIk7rZTwWn_7QmFthsuVX8jc0YP0FY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/ZmFzdGZvb2RtZW51/bnV0cml0aW9uLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/NS8wMy9mYXN0LWZv/b2QuanBn",
  "diets": [1, 4, 5, 3]
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  //beforeEach(() => Recipe.sync({ force: true })
  beforeEach(() => Recipe.sync()
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});
