const User = require('../models/user');
const Car = require('../models/car');

exports.get_cars = async (req, res, next) => {
  const cars = await Car.find({});
  res.status(200).json(cars);
};

exports.create_car = async (req, res, next) => {
  console.log(req.value);
  // Find Seller
  const user = await User.findById(req.value.body.seller);

  // Create Car
  const carData = req.value.body;
  delete carData.seller;

  const car = await Car.create({
    ...carData,
    seller: user
  });

  // Add new car to seller
  user.cars.push(car);
  await user.save();

  res.status(201).json(car);
};

exports.get_car = async (req, res, next) => {
  const { carId } = req.value.params;
  const car = await Car.findById(carId);
  res.status(200).json(car);
};

exports.replace_car = async (req, res, next) => {
  const { carId } = req.value.params;
  const carData = req.value.body;

  await Car.findByIdAndUpdate(carId, carData);
  const updatedCar = await Car.findById(carId);
  res.status(200).json(updatedCar);
};

exports.update_car = async (req, res, next) => {
  const { carId } = req.value.params;
  const carData = req.value.body;

  await Car.findByIdAndUpdate(carId, carData);
  const updatedCar = await Car.findById(carId);
  res.status(200).json(updatedCar);
};

exports.delete_car = async (req, res, next) => {
  const { carId } = req.value.params;

  // Get car
  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ error: `Car doesn't exist` });

  // Get seller
  const sellerId = car.seller;
  const seller = await User.findById(sellerId);

  // Remove car and remove from user cars list
  car.remove();
  seller.cars.pull(car);
  await seller.save();

  res.status(200).json({ success: true });
};