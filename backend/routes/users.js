const router = require('express').Router();

const {
  listUsers, createUser, updateProfile, updateUserAvatar,
  userMe,
} = require('../controllers/users');
const CustomError = require('../errors/CustomError');

router.get('/users', listUsers);

router.get('/users/me', userMe);

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newUser = await createUser(body);
    res.status(200).json(newUser);
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

router.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUserNew = await updateProfile(userId, updatedData);
    res.status(200).json(updatedUserNew);
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

router.patch('/:id/avatar', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updateAvatarNew = await updateUserAvatar(userId, updatedData);
    res.status(200).json(updateAvatarNew);
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
