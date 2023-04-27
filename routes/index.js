const router = require('express').Router(); // создали роутер
const auth = require('../middlewares/auth');

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
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use((req, res, next) => {
  next(new NotFoundError(MSG_PAGE_NOT_FOUND));
});
module.exports = router;
