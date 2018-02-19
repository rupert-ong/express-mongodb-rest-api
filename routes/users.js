const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/users');

const { validateParam, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(usersController.get_users)
  .post(usersController.create_user);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), usersController.get_user)
  .put(usersController.replace_user)
  .patch(usersController.update_user);

router.route('/:userId/cars')
  .get(usersController.get_user_cars)
  .post(usersController.create_user_car);

module.exports = router;