const { request } = require('express');
const controller = require('../controller/controller');

const routes = require('express').Router();

//the endpoint here is categories
routes.route('/api/categories')

// calls the create_Categories function from controller.js
.post(controller.create_Categories);

module.exports=routes;