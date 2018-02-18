const User = require('../models/user');

exports.get_users = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) next(err);
    res.status(200).json(users);
  });
};