const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'token não confere' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Autorização necessária' });
  }

  req.user = payload;

  next();
};
