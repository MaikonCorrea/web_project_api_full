const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  listCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');

router.get('/cards', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
}), listCards);

router.post('/cards', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteCard);

router.put('/cards/likes/:cardId', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
}), likeCard);

router.delete('/cards/likes/:cardId', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
}), unlikeCard);

module.exports = router;
