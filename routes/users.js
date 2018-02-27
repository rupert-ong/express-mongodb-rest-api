const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(usersController.get_users)
  .post(validateBody(schemas.userSchema),
    usersController.create_user);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'),
    usersController.get_user)
  .put(validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userSchema),
    usersController.replace_user)
  .patch(validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userOptionalSchema),
    usersController.update_user);

router.route('/:userId/cars')
  .get(validateParam(schemas.idSchema, 'userId'),
    usersController.get_user_cars)
  .post(validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userCarSchema),
    usersController.create_user_car);

module.exports = router;