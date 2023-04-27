const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');
const {
  MSG_AUTH_UNAUTH_ERR,
} = require('../utils/constants');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(MSG_AUTH_UNAUTH_ERR));
  }
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorizedError(MSG_AUTH_UNAUTH_ERR));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
