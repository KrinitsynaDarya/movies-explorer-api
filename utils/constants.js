// statuses
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

// messages
const MSG_FILM_ADD_BAD_REQ = 'Переданы некорректные данные при добавлении фильма';
const MSG_FILM_DEL_FORBIDDEN_ERR = 'Фильм с указанным _id не принадлежит текущему пользователю';
const MSG_FILM_NOT_FOUND = 'Фильм с указанным _id не найден';
const MSG_FILM_CAST_ERR = 'Передан некорректный _id при поиске фильма';
const MSG_AUTH_SUCCESS = 'Успешная авторизация';
const MSG_USER_EXISTS = 'Пользователь с данным email уже существует';
const MSG_USER_NOT_FOUND = 'Пользователь по указанному _id не найден';
const MSG_USER_CAST_ERR = 'Передан некорректный _id при поиске пользователя';
const MSG_USER_UPD_BAD_REQ = 'Переданы некорректные данные при обновлении профиля';
const MSG_AUTH_UNAUTH_ERR = 'Необходима авторизация';
const MSG_PAGE_NOT_FOUND = 'Запрашиваемая страница не найдена';
const MSG_ERR_DEFAULT = 'На сервере произошла ошибка';

module.exports = {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  MSG_FILM_ADD_BAD_REQ,
  MSG_FILM_DEL_FORBIDDEN_ERR,
  MSG_FILM_NOT_FOUND,
  MSG_FILM_CAST_ERR,
  MSG_AUTH_SUCCESS,
  MSG_USER_EXISTS,
  MSG_USER_NOT_FOUND,
  MSG_USER_CAST_ERR,
  MSG_USER_UPD_BAD_REQ,
  MSG_AUTH_UNAUTH_ERR,
  MSG_PAGE_NOT_FOUND,
  MSG_ERR_DEFAULT,
};
