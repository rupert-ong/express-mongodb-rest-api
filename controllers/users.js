const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Car = require('../models/car');

exports.get_users = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

exports.create_user = async (req, res, next) => {
  // req.value.body created in routeHelpers Joi validation methods
  console.log(req.value);
  // Only allow user creation if email does not exist
  const usersWithEmail = await User.find({ email: req.value.body.email });
  if (usersWithEmail.length >= 1) {
    res.status(409).json({ message: 'User exists' });
  }
  const hash = await bcrypt.hash(req.value.body.password, 10);
  let userData = req.value.body;
  userData.password = hash;
  const user = await User.create(userData);
  res.status(201).json(user);
};

exports.login_user = async (req, res, next) => {
  const user = await User.findOne({ email: req.value.body.email });
  if (!user) return res.status(401).json({ message: 'Authentication failed' });

  const isValid = await bcrypt.compare(req.value.body.password, user.password);
  if (isValid) {
    const token = jwt.sign({
      email: user.email,
      userId: user._id
    }, process.env.JWT_KEY, {
        expiresIn: '1h'
      });
    return res.status(200).json({
      message: 'Authentication successful',
      token: token
    });
  } else { 
    res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.get_user = async (req, res, next) => {
  // req.value.params created in routeHelpers Joi validation methods
  const { userId } = req.value.params ? req.value.params : req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
};

exports.replace_user = async (req, res, next) => {
  // req.value.body created in routeHelpers Joi validation methods
  const { userId } = req.value.params ? req.value.params : req.params;
  const userData = req.value.body ? req.value.body : req.body;

  await User.findByIdAndUpdate(userId, userData);
  const updatedUser = await User.findById(userId)
  res.status(200).json(updatedUser);
};

exports.update_user = async (req, res, next) => {
  // req.value.body created in routeHelpers Joi validation methods
  const { userId } = req.value.params ? req.value.params : req.params;
  const userData = req.value.body ? req.value.body : req.body;

  await User.findByIdAndUpdate(userId, userData);
  const updatedUser = await User.findById(userId);
  res.status(200).json(updatedUser);
};

exports.get_user_cars = async (req, res, next) => {
  // req.value.body created in routeHelpers Joi validation methods
  const { userId } = req.value.params ? req.value.params : req.params;
  const user = await User.findById(userId).populate('cars');
  res.status(200).json(user.cars);
};

exports.create_user_car = async (req, res, next) => {
  const { userId } = req.value.params ? req.value.params : req.params;
  const carData = req.value.body ? req.value.body : req.body;
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