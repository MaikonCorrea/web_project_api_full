const router = require('express').Router();

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

router.delete('/:id', async (req, res) => {
  try {
    const idUser = req.user._id;
    const idCardDelete = req.params.id;

    const cards = await listCards();

    const cardToDelete = cards.find((card) => card._id.toString() === idCardDelete);

    if (!cardToDelete) {
      return res.status(404).json({ message: 'Cartão não encontrado' });
    }

    if (cardToDelete.owner.toString() !== idUser) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este cartão' });
    }
    deleteCard(idCardDelete);
    res.status(200).json({ message: 'Cartão excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao encontrar o cartão' });
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
