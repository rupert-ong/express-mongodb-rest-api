const express = require('express');
const router = require('express-promise-router')();
const usersController = require('../controllers/users');

router.route('/')
  .get(usersController.get_users)
  .post(usersController.create_user);

router.route('/:userId')
  .get(usersController.get_user)
  .put(usersController.replace_user)
  .patch(usersController.update_user);

module.exports = router;