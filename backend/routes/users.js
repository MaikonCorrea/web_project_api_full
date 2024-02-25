const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../utils/validateURL');

const {
  listUsers, updateProfile, updateUserAvatar,
  userMe,
} = require('../controllers/users');

router.get('/users', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(),
}), listUsers);

router.get('/users/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(),
}), userMe);

router.patch('/users/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateUserAvatar);

module.exports = router;
