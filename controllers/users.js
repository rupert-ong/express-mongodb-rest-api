const User = require('../models/user');

exports.get_users = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.create_user = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.get_user = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
};

exports.replace_user = async (req, res, next) => {
  // TODO: Require req.body to contain all fields
  const { userId } = req.params;
  const userData = req.body;

  await User.findByIdAndUpdate(userId, userData);
  const updatedUser = await User.findById(userId)
  res.status(200).json(updatedUser);
};

exports.update_user = async (req, res, next) => {
  const { userId } = req.params;
  const userData = req.body;

  await User.findByIdAndUpdate(userId, userData);
  const updatedUser = await User.findById(userId);
  res.status(200).json(updatedUser);
};