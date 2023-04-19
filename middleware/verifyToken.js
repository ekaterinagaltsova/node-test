const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(403).send('NEED_AUTHORIZATION');
  req.userId = jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
    if (error) {
      return res.status(403).send(error.message);
    }
    return data;
  });
  return next();
};

module.exports = { verifyToken };
