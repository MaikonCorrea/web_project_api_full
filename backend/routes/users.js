const router = require('express').Router();

const {
  listUsers, createUser, updateProfile, updateUserAvatar,
  userMe,
} = require('../controllers/users');

router.get('/users', listUsers);

router.get('/users/me', userMe);

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const newUser = await createUser(body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUserNew = await updateProfile(userId, updatedData);
    res.status(200).json(updatedUserNew);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/avatar', async (req, res, next) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updateAvatarNew = await updateUserAvatar(userId, updatedData);
    res.status(200).json(updateAvatarNew);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
