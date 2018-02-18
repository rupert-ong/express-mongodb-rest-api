const User = require('../models/user');

exports.get_users = (req, res, next) => {
  User.find({})
    .exec()
    .then(users => {
      res.status(200).json(users);
    }).catch(err => {
      next(err);
    });
};

exports.create_user = (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.status(201).json(user);
    }).catch(err => {
      next(err);
    });
};