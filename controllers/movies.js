// импортируем модель
const mongoose = require('mongoose');
const Movie = require('../models/movie');

const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

/* вариант без вложенного промиса и дублирования дефолтного ответа */
module.exports.addMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    // const movie = await data.populate('owner');

    res.status(HTTP_STATUS_CREATED).send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
    } else { next(err); }
  }
};

module.exports.getMovies = (req, res, next) => {
  // найти вообще всех
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .orFail()
    .then((movie) => {
      if (req.user._id.toString() !== movie.owner._id.toString()) {
        next(new ForbiddenError('Фильм с указанным _id не принадлежит текущему пользователю'));
      } else {
        movie.remove()
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Фильм с указанным _id не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id при поиске фильма'));
      } else { next(err); }
    });
};
