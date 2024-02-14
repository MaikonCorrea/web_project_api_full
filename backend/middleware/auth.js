/* const jwt = require('jsonwebtoken');
const { validateHash } = require('../utils/hash');
 */
module.exports = (req, res, next) => {
  const headers = req.headers;
  console.log(headers)

/*   if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Autorização necessária' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Autorização necessária' });
  }

  req.user = payload; */

  next();
};
