'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server)

describe('categories and products happy path', () => {
  it('can get categories', async () => {
      let response = await mockRequest.get('/categories');

      expect(JSON.stringify(response.body)).toBe(
          JSON.stringify([
              {
                "id": 1,
                "name": "burger",
                "display_name": "fast food",
                "description": "food"
              },
          ]),
      );
      expect(response.status).toBe(200);
  });

  it('can get products', async () =>{
    let response = await mockRequest.get('/products');
    expect(JSON.stringify(response.body)).toBe(JSON.stringify([
      {
        "id": 1,
        "category": "burger",
        "name": "cheese burger",
        "display_name": "burger",
        "description": "burger"
      }
    ])
    );
    expect(response.status).toBe(200);
  })
  

  it('can create a new products', async () => {
      let newProductsData = {
          "name": 'Pizza',
          "display_name": "take-out",
          "description": "gluten free"
      };

      let response = await mockRequest.post('/products/1').send(newProductsData);

      expect(JSON.stringify(response.body)).toBe(
          JSON.stringify({ name: 'pizza', display_name: 'take-out',description: 'gluten free', id: 3 }),
      );

      expect(response.status).toBe(200);
  });
  it('can update a new products', async () => {
    let newProductsData = {
      "id": 1,
      "category": "burger",
      "name": "cheese burger",
      "display_name": "burger",
      "description": "burger"
    };

    let response = await mockRequest.put('/products/1').send(newProductsData);

    expect(JSON.stringify(response.body)).toBe(
        JSON.stringify({ category:'pizza',name: 'pizza', display_name: 'take-out',description: 'gluten free'}),
    );

    expect(response.status).toBe(200);
});
});

describe('middleware works', () => {
  it("gives 404 error when accessing route that doesn't exist", async () => {
      let response = await mockRequest.get('/blah');
      expect(response.status).toBe(404);
  });
});