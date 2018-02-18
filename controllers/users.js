const User = require('../models/user');

exports.get_users = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.create_user = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};