const Card = require('../models/card');
const CustomError = require('../errors/CustomError');

module.exports = {
  listCards: async () => {
    const cards = await Card.find();
    return cards;
  },

  createCard: async (body, req) => {
    const { name, link } = body;
    const linkRegex = /^https?:\/\/[^\s]+$/;
    const isLinkValid = link.match(linkRegex);
    if (!isLinkValid) {
      throw new CustomError('Link de imagem inválido!', 'InvalidLinkError', 400);
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
      return saveCard;
    } catch (error) {
      if (error instanceof CustomError) {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field].message;
        throw new CustomError(message, 'ValidationError', 400);
      } else {
        throw error;
      }
    }
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
        { $addToSet: { likes: userId } }, // Adiciona userId ao array se ele não estiver lá
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
        { $pull: { likes: userId } }, // Remove userId do array
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
