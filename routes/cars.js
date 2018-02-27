const express = require('express');
const router = require('express-promise-router')();
const CarsController = require('../controllers/cars');
const { validateBody, validateParam, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(CarsController.get_cars)
  .post(validateBody(schemas.carSchema),
    CarsController.create_car);

router.route('/:carId')
  .get(validateParam(schemas.idSchema, 'carId'), 
    CarsController.get_car)
  .put(validateParam(schemas.idSchema, 'carId'),
    validateBody(schemas.userCarSchema),
    CarsController.replace_car);

module.exports = router;