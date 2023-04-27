const router = require('express').Router(); // создали роутер
const auth = require('../middlewares/auth');
const {
  MSG_AUTH_EXIT,
} = require('../utils/constants');

const NotFoundError = require('../errors/not-found-err');
const {
  MSG_PAGE_NOT_FOUND,
} = require('../utils/constants');

router.use('/', require('./auth'));

router.use(auth);

// роуты, которым авторизация нужна
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: MSG_AUTH_EXIT });
});

router.use((req, res, next) => {
  next(new NotFoundError(MSG_PAGE_NOT_FOUND));
});
module.exports = router;
