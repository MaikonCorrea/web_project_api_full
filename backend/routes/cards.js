const router = require('express').Router();

const {
  listCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');
const CustomError = require('../errors/CustomError');

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await listCards();
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

router.post('/card', createCard);

router.delete('/:id', async (req, res) => {
  const cardId = req.params.id;

  try {
    const cards = await listCards();
    const cardExists = cards.some((card) => card.id === cardId);

    if (!cardExists) {
      throw new CustomError('Card não encontrado!', 'CardNotFoundError', 404);
    }
    const deletedCard = await deleteCard(cardId);
    res.status(204).send(deletedCard);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({
        message: error.message,
        type: error.name,
        Status: error.statusCode,
      });
  }
});

router.put('/:cardId/likes', async (req, res) => {
  try {
    await likeCard(req, res);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({
        message: error.message,
        type: error.name,
        Status: error.statusCode,
      });
  }
});

router.delete('/:cardId/likes', async (req, res) => {
  try {
    await unlikeCard(req, res);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({
        message: error.message,
        type: error.name,
        Status: error.statusCode,
      });
  }
});

module.exports = router;
