const ValidationError = require('../errors/ValidationError ');
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
      const saveCard = await newCard.save();
      res.status(201).json(saveCard);
    } catch (err) {
      next(err);
    }
  },

  listCards: async () => {
    const cards = await Card.find();
    return cards;
  },

  deleteCard: async (id) => {
    const deletedCard = await Card.findByIdAndDelete(id);
    return deletedCard;
  },

  likeCard: async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const userId = req.user._id;

      await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
      );

      res.status(200).json({ message: 'like card' });
    } catch (error) {
      next(error);
    }
  },

  unlikeCard: async (req, res, next) => {
    try {
      const { cardId } = req.params;
      const userId = req.user._id;

      await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true },
      );

      res.status(200).json({ message: 'unlike card' });
    } catch (error) {
      next(error);
    }
  },

};
