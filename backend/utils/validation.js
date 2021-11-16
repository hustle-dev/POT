const Joi = require('joi');

/**
 * Simple check register validation using Joi.
 * @param {object} data - register form data
 * @returns {boolean}
 */
const registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(8).required(),
    summoner: Joi.string().min(1).required(),
    imageUrl: Joi.string().min(1).required(),
    encryptedId: Joi.string().min(1).required(),
  });

  return schema.validate(data);
};

/**
 * Simpple check login validation using Joi.
 * @param {object} data - login form data
 * @returns {boolean}
 */
const loginValidation = data => {
  const schema = Joi.object({
    account: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
