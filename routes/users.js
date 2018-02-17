const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.route('/')
  .get(usersController.get_users)
  .post();

module.exports = router;