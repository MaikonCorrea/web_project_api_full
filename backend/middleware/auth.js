const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new UnauthorizedError('Authorization required!');
    return next(unauthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    next(error);
  }

  req.user = payload;

  next();
};
