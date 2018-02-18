const User = require('../models/user');

exports.get_users = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) next(err);
    res.status(200).json(users);
  });
};

exports.create_user = (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) next(err);
    res.status(201).json(user);
  });
};