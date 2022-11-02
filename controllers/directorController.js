const Director = require("../models/director");
const Movie = require("../models/movie");
const async = require("async");
const { findById } = require("../models/movie");
const { body, validationResult } = require("express-validator");

exports.director_list = (req, res, next) => {
  Director.find().exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

exports.director_detail = (req, res, next) => {
  async.parallel(
    {
      director(callback) {
        Director.findById(req.params.id).exec(callback);
      },
      director_movies(callback) {
        Movie.find({ director: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.director == null) {
        const err = new Error("Director Not Found");
        err.status = 400;
        return next(err);
      }
      res.send(results);
    }
  );
};

exports.director_create_get = (req, res) => {
  res.send("Add New Director Form");
};

exports.director_create_post = [
  body("name", "Director name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const director = req.body;
    const newDirector = new Director(director);
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      newDirector.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(director);
      });
    }
  },
];

exports.director_delete_get = (req, res, next) => {
  async.parallel(
    {
      director(callback) {
        Director.findById(req.params.id).exec(callback);
      },
      director_movies(callback) {
        Movie.find({ director: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
};

exports.director_delete_post = (req, res, next) => {
  Director.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json("Success");
    }
  });
};

exports.director_update_get = (req, res) => {
  res.send("Implement Update Director Get");
};

exports.director_update_post = (req, res, next) => {
  const director = new Director({
    name: req.body.name,
    _id: req.params.id,
  });
  Director.findByIdAndUpdate(req.params.id, director, {}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};
