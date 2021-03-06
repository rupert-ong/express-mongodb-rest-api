const express = require('express');
const router = require('express-promise-router')();
const CarsController = require('../controllers/cars');
const { validateBody, validateParam, schemas, checkAuthentication } = require('../helpers/routeHelpers');

router.route('/')
  .get(CarsController.get_cars)
  .post(checkAuthentication, validateBody(schemas.carSchema),
    CarsController.create_car);

router.route('/:carId')
  .get(validateParam(schemas.idSchema, 'carId'), 
    CarsController.get_car)
  .put(checkAuthentication, validateParam(schemas.idSchema, 'carId'),
    validateBody(schemas.userCarSchema),
    CarsController.replace_car)
  .patch(checkAuthentication, validateParam(schemas.idSchema, 'carId'),
    validateBody(schemas.carOptionalSchema),
    CarsController.update_car)
  .delete(checkAuthentication, validateParam(schemas.idSchema, 'carId'),
    CarsController.delete_car);

module.exports = router;