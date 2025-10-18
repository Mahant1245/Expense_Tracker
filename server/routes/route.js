const { request } = require('express');
const controller = require('../controller/controller');

const routes = require('express').Router();

//the endpoint here is categories
// calls the create_Categories function from controller.js

routes.route('/api/categories')
    .post(controller.create_Categories)
    .get(controller.get_Categories);

routes.route('/api/transaction')
    .post(controller.create_transation)
    .get(controller.get_transaction)
    .delete(controller.delete_transaction);

routes.route('/api/labels')
    .get(controller.get_labels);

module.exports=routes;