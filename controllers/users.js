const User = require('../models/user');
const Car = require('../models/car');

const Joi = require('joi');
const idSchema = Joi.object({
  userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});

exports.get_users = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.create_user = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.get_user = async (req, res, next) => {
  const result = Joi.validate(req.params, idSchema);
  console.log('Joi', result);
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

exports.get_user_cars = async (req, res, next) => {
  const user = await User.findById(req.params.userId).populate('cars');
  res.status(200).json(user.cars);
};

exports.create_user_car = async (req, res, next) => {
  const { userId } = req.params;
  const carData = req.body;
  const user = await User.findById(userId);
  const car = await Car.create({
    ...carData,
    seller: user
  });
  // Add car to User cars array
  user.cars.push(car);
  await user.save();
  res.status(201).json(car);
};