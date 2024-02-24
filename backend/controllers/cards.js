const Card = require('../models/card');
const CustomError = require('../errors/CustomError');

module.exports = {
  createCard: async (req, res) => {
    const { name, link } = req.body;
    const linkRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
    const isValidLink = link.match(linkRegex);
    if (!isValidLink) {
      throw new CustomError('message', 'ValidationError', 400);
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
    } catch (error) {
      if (error instanceof CustomError) {
        throw new CustomError(error.message, 'ValidationError', 400);
      } else {
        throw error;
      }
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

  likeCard: async (req, res) => {
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
      res.status(error.statusCode).json({
        message: error.message,
        type: error.name,
        status: error.statusCode,
      });
    }
  },

  unlikeCard: async (req, res) => {
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
      res.status(error.statusCode).json({
        message: error.message,
        type: error.name,
        status: error.statusCode,
      });
    }
  },

};
