const Category = require("../models/category");
const Movie = require("../models/movie");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.category_list = (req, res, next) => {
  Category.find().exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_movies(callback) {
        Movie.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        const err = new Error("Category Not Found");
        err.status = 404;
        return next(err);
      }
      res.send(results);
    }
  );
};

exports.category_create_get = (req, res) => {
  res.json("Add New Category Form");
};

exports.category_create_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const category = req.body;
    const newCategory = new Category(category);
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      newCategory.save((err) => {
        if (err) {
          return next(err);
        }
        res.json(category);
      });
    }
  },
];

exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_movies(callback) {
        Movie.find({ category: req.params.id }).exec(callback);
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

exports.category_delete_post = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return next(err);
    } else {
      res.json("Success");
    }
  });
};

exports.category_update_get = (req, res) => {
  res.send("Implement Category Update Get");
};

exports.category_update_post = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    _id: req.params.id,
  });
  Category.findByIdAndUpdate(req.params.id, category, {}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};
