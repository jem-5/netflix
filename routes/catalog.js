var express = require("express");
var router = express.Router();

const movie_controller = require("../controllers/movieController");
const director_controller = require("../controllers/directorController");
const category_controller = require("../controllers/categoryController");

// MOVIE ROUTES

router.get("/", movie_controller.index);

router.get("/movies", movie_controller.movie_list);

router.get("/movie/create", movie_controller.movie_create_get);

router.post("/movie/create", movie_controller.movie_create_post);

router.get("/movie/:id/delete", movie_controller.movie_delete_get);

router.post("/movie/:id/delete", movie_controller.movie_delete_post);

router.get("/movie/:id/update", movie_controller.movie_update_get);

router.post("/movie/:id/update", movie_controller.movie_update_post);

router.get("/movie/:id", movie_controller.movie_detail);

// DIRECTOR ROUTES

router.get("/directors", director_controller.director_list);

router.get("/director/create", director_controller.director_create_get);

router.post("/director/create", director_controller.director_create_post);

router.get("/director/:id/update", director_controller.director_update_get);

router.post("/director/:id/update", director_controller.director_update_post);

router.get("/director/:id/delete", director_controller.director_delete_get);

router.post("/director/:id/delete", director_controller.director_delete_post);

router.get("/director/:id", director_controller.director_detail);

// CATEGORY ROUTES

router.get("/categories", category_controller.category_list);

router.get("/category/create", category_controller.category_create_get);

router.post("/category/create", category_controller.category_create_post);

router.get("/category/:id/update", category_controller.category_update_get);

router.post("/category/:id/update", category_controller.category_update_post);

router.get("/category/:id/delete", category_controller.category_delete_get);

router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/category/:id", category_controller.category_detail);

module.exports = router;
