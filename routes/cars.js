const express = require('express');
const router = require('express-promise-router')();
const CarsController = require('../controllers/cars');
const { validateBody, validateParams, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(CarsController.get_cars)
  .post(validateBody(schemas.createCarSchema),
    CarsController.create_car);

module.exports = router;