const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Create a generic validation method middleware that takes
// any schema checks a request parameter
exports.validateParam = (schema, name) => {
  return (req, res, next) => {
    const result = Joi.validate({ param: req['params'][name] }, schema);
    console.log('Joi result: ', result);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      // Create a req.value object to hold params that have passed validation
      // (Joi result.value.param) instead of using req.params.paramName in controllers
      if (!req.value) req.value = {};
      if (!req.value['params']) req.value['params'] = {};
      req.value['params'][name] = result.value.param;
      next();
    }
  };
};

// Create a generic validation method middleware that takes any
// schema and checks the request body
exports.validateBody = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    console.log('Joi result: ', result);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value['body']) req.value['body'] = {};
      req.value['body'] = result.value;
      next();
    }
  }
};

exports.schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  userCreateSchema: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
  }),

  userLoginSchema: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required()
  }),

  userUpdateSchema: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required()
  }),

  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email()
  }),

  userCarSchema: Joi.object().keys({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
  }),

  carSchema: Joi.object().keys({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required(),
    seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  carOptionalSchema: Joi.object().keys({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.number()
  })
};

exports.checkAuthentication = (req, res, next) => {
  try {
    // Put token in request header after login
    // Key: Authorization
    // Value: Bearer yourTokenValue
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authorization failed ' });
  }
};