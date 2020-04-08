'use strict';
let data = require('../db.json')
const notFound = require('./middleware/404.js')
const express = require('express');
const app = express();


app.use(express.json())
/**
 * Home route
 * @route GET /
 * @group Home
 * @returns {object} 200 - Will give welcoming message 
 */

app.get('/', (req, res) => {
  res.send('WELCOME THIS IS HOMEPAGE')
})

/**
 * Products GET route
 * @group Products
 * @route GET /products
 * @returns {object} 200 -This route show data from products object
 */
app.get('/products', productGetHandler);
/**
 * Products POST route
 * @group Products
 * @route POST /products
 * @returns {object} 200 -This route create data inside products object
 */
app.post('/products', productPostHandler);
/**
 * Products PUT route
 * @group Products
 * @route PUT /products/:id
 * @returns {object} 201 -This route update data in products object
 */
app.put('/products/:id', productPutHandler);
/**
 * Products DELETE route
 * @group Products
 * @route DELETE /products/:id
 * @returns {object} 200 -This route delete data in products object
 */
app.delete('/products/:id', productDeleteHandler);


/**
 * Categories GET route
 * @group Categories
 * @route GET /categories
 * @returns {object} 200 -This route show data from categories object
 */
app.get('/categories', categoriesGetHandler);

/**
 * Categories POST route
 * @group Categories
 * @route POST /categories
 * @returns {object} 200 -This route create data inside categories object
 */
app.post('/categories', categoriesPostHandler);
/**
 * Categories PUT route
 * @group Categories
 * @route PUT /categories/:id
 * @returns {object} 200 -This route update data in categories object
 */
app.put('/category/:id', categoryPutHandler);
/**
 * Categories DELETE route
 * @group Categories
 * @route DELETE /categories/:id
 * @returns {object} 200 -This route delete data in categories object
 */
app.delete('/category/:id', categoryDeleteHandler);

function productGetHandler (req, res){
  res.send(data.products)
}

function productPostHandler (req, res){
  let newProduct = req.body;
  newProduct.id = data.products.length + 1;
  data.products.push(newProduct);

  res.status(201);
  res.send(newProduct)
}

function productPutHandler(req, res){
  let proId = parseInt(req.params.id)-1;
  let newData = req.body;
  
  data.products[proId] = {
    ... newData, id: proId + 1
  };
  res.status(201)
  res.send(data.products[proId]);
}

function productDeleteHandler (req, res){
  let deleteId = parseInt(req.params.id);

  let dbFilter = data.products.filter(ele => {
    return ele.id != deleteId;
  });
  res.send(dbFilter)
}

function categoriesGetHandler (req, res){
  res.send(data.categories)
}

function categoriesPostHandler (req, res){
  let newCategory = req.body;
  newCategory.id = data.categories.length + 1;
  data.categories.push(newCategory)

  res.status(201);
  res.send(newCategory)
}

function categoryPutHandler(req, res){
  catId = parseInt(req.params.id)-1;
  let newData = req.body;

  data.categories[catId] = {
    ... newData, id: catId +1 
  };
  res.status(201);
  res.send(data.categories[catId]);
  }
 
function categoryDeleteHandler (req, res){
  let catId = parseInt(req.params.id)-1

  data.categories.splice(catId);
  res.send(200);
  res.send('successfully Deleted')
}

app.use('*', notFound);


const startServer = (port) => {
  
  app.listen(port, () => {
    console.log('Server is up and running on port', port)
  })
}


module.exports = {
  server: app,
  start: startServer
};