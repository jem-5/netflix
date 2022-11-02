const Movie = require("../models/movie");
const Director = require("../models/director");
const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  async.parallel(
    {
      movie_count(callback) {
        Movie.countDocuments({}, callback);
      },
      movie_available_count(callback) {
        Movie.find({}, callback);
      },
      director_count(callback) {
        Director.countDocuments({}, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.send(results);
    }
  );
};

exports.movie_list = (req, res, next) => {
  Movie.find().exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

exports.movie_detail = (req, res) => {
  Movie.findById(req.params.id).exec((err, results) => {
    if (err) {
      return err;
    }
    res.send(results);
  });
};

exports.movie_create_get = (req, res) => {
  async.parallel(
    {
      categories(callback) {
        Category.find({}, callback);
      },
      directors(callback) {
        Director.find({}, callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      console.log(results);
      res.send(results);
    }
  );
};

exports.movie_create_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("director", "Director must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      summary: req.body.summary,
      category: req.body.category,
      year: req.body.year,
      price: req.body.price,
      stock: req.body.stock,
    });
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      newMovie.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(newMovie);
      });
    }
  },
];
exports.movie_delete_get = (req, res, next) => {
  Movie.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

exports.movie_delete_post = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json("Success");
    }
  });
};

exports.movie_update_get = (req, res) => {
  res.send("Implement Movie Update Get");
};

exports.movie_update_post = (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    summary: req.body.summary,
    category: req.body.category,
    year: req.body.year,
    price: req.body.price,
    stock: req.body.stock,
    _id: req.params.id,
  });
  console.log(movie);
  Movie.findByIdAndUpdate(req.params.id, movie, {}, (err, results) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(results);
    console.log(results);
  });
};
