const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/users');

const { validateParam, validateBody, schemas, checkAuthentication } = require('../helpers/routeHelpers');

router.route('/')
  .get(usersController.get_users)
  .post(validateBody(schemas.userCreateSchema),
    usersController.create_user);

router.post('/login', validateBody(schemas.userLoginSchema), usersController.login_user);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'),
    usersController.get_user)
  .put(checkAuthentication, validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userUpdateSchema),
    usersController.replace_user)
  .patch(checkAuthentication, validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userOptionalSchema),
    usersController.update_user);

router.route('/:userId/cars')
  .get(validateParam(schemas.idSchema, 'userId'),
    usersController.get_user_cars)
  .post(checkAuthentication, validateParam(schemas.idSchema, 'userId'),
    validateBody(schemas.userCarSchema),
    usersController.create_user_car);

module.exports = router;