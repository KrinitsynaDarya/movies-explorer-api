// импортируем модель
const mongoose = require('mongoose');
const Movie = require('../models/movie');

const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const {
  MSG_FILM_ADD_BAD_REQ,
  MSG_FILM_DEL_FORBIDDEN_ERR,
  MSG_FILM_NOT_FOUND,
  MSG_FILM_CAST_ERR,
} = require('../utils/constants');

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
      next(new BadRequestError(MSG_FILM_ADD_BAD_REQ));
    } else { next(err); }
  }
};

module.exports.getMovies = (req, res, next) => {
  // найти фильмы текущего пользователя
  Movie.find({ owner: req.user._id })
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
        next(new ForbiddenError(MSG_FILM_DEL_FORBIDDEN_ERR));
      } else {
        movie.remove()
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MSG_FILM_NOT_FOUND));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(MSG_FILM_CAST_ERR));
      } else { next(err); }
    });
};
