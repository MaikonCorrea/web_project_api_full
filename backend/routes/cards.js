const router = require('express').Router();
const { UnauthorizedError, NotFoundError } = require('../errors/UnauthorizedError');

const {
  listCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await listCards();
    res.json(cards);
  } catch (error) {
    next(error);
  }
});

router.post('/cards', createCard);

router.delete('/:cardId', async (req, res, next) => {
  try {
    const idUser = req.user._id;
    const idCardDelete = req.params.id;

    const cards = await listCards();

    const cardToDelete = cards.find((card) => card._id.toString() === idCardDelete);

    if (!cardToDelete) {
      const notFoundError = new NotFoundError('Card not found');
      return next(notFoundError);
    }

    if (cardToDelete.owner.toString() !== idUser) {
      const unauthorized = new UnauthorizedError('User is allowed to delete this card');
      return next(unauthorized);
    }
    deleteCard(idCardDelete);
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.put('/:cardId/likes', async (req, res, next) => {
  try {
    await likeCard(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cardId/likes', async (req, res, next) => {
  try {
    await unlikeCard(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
