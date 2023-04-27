const router = require('express').Router(); // создали роутер

const { deleteMovieByIdValidator, addMovieValidator } = require('../middlewares/validator');
// контроллеры и роуты для карточек
const {
  getMovies,
  deleteMovieById,
  addMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все карточки
router.delete('/:movieId', deleteMovieByIdValidator, deleteMovieById); // удаляет карточку по идентификатору
router.post('/', addMovieValidator, addMovie); // создаёт карточку

module.exports = router;
