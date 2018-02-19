const Joi = require('joi');

// Create a generic validation method middleware that takes
// any schema and parameter name
exports.validateParam = (schema, name) => {
  return (req, res, next) => {
    const result = Joi.validate({ param: req['params'][name] }, schema);
    console.log('Joi result: ', result);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      // Create a req.value object to hold params that have passed validation
      // (Joi result.value.param) instead of using req.params.paramName in controllers
      if(!req.value) req.value = {};
      if(!req.value['params']) req.value['params'] = {};
      req.value['params'][name] = result.value.param;
      next();
    }
  };
};

exports.schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
};