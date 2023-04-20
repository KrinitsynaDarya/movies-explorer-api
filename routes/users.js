const router = require('express').Router(); // создали роутер
const { updateUserValidator } = require('../middlewares/validator');

// контроллеры и роуты для пользователей
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser); // возвращает текущего пользователя
router.patch('/me', updateUserValidator, updateUser); // обновляет профиль

module.exports = router;
