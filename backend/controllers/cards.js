const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFaundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');

module.exports = {
  createCard: async (req, res, next) => {
    const { name, link } = req.body;
    const linkRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
    const isValidLink = link.match(linkRegex);
    if (!isValidLink) {
      const validationError = new ValidationError('Link entered is not valid');
      return next(validationError);
    }
    const owner = req.user._id;
    const newCard = new Card({
      name,
      link,
      owner,
      createdAt: new Date(),
    });

    try {
      const savedCard = await newCard.save();
      const cards = await Card.find();
      cards.unshift(savedCard);
      res.status(201).json(savedCard);
    } catch (err) {
      next(err);
    }
  },

  listCards: async (req, res, next) => {
    try {
      const cards = await Card.find().sort({ createdAt: -1 });
      return res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  },

  deleteCard: async (req, res, next) => {
    try {
      const idUser = req.user._id;
      const idCardDelete = req.params.cardId;

      const cards = await Card.find();

      const cardToDelete = cards.find((card) => card._id.toString() === idCardDelete);

      if (!cardToDelete) {
        const notFoundError = new NotFoundError('Card not found');
        return next(notFoundError);
      }

      if (cardToDelete.owner.toString() !== idUser) {
        const Forbidden = new ForbiddenError('User is not allowed to delete this card');
        throw Forbidden;
      }

      await Card.findByIdAndDelete(idCardDelete);
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  likeCard: async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const userId = req.user._id;
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
      );
      res.status(200).json(updatedCard);
    } catch (error) {
      next(error);
    }
  },

  unlikeCard: async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const userId = req.user._id;
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true },
      );
      res.status(200).json(updatedCard);
    } catch (error) {
      next(error);
    }
  },

};
