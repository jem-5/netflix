import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { useState, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import "../App.css";

const MovieDetail = () => {
  const id = useParams();
  const [movie, setMovie] = useState([]);
  const [director, setDirector] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/catalog/movie/${id.id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(movie);

  useEffect(() => {
    if (movie.length !== 0) {
      axios
        .get(`http://localhost:3000/catalog/director/${movie.director}`)
        .then((response) => {
          setDirector(response.data.director.name);
        })
        .catch((err) => console.log(err));
    }
  }, [movie]);

  useEffect(() => {
    if (movie.length !== 0) {
      axios
        .get(`http://localhost:3000/catalog/category/${movie.category}`)
        .then((response) => {
          setCategory(response.data.category.name);
        })
        .catch((err) => console.log(err));
    }
  }, [movie]);

  return (
    <div className="movie-detail">
      <Typography variant="h6" gutterBottom>
        Movie Detail: {movie.title}
      </Typography>
      {movie.img ? (
        <img className="movie-detail-img" src={movie.img} alt={movie.title} />
      ) : (
        ""
      )}
      <List style={{ textAlign: "left" }}>
        <ListItemText primary={`Title: ${movie.title}`} />
        <ListItemText primary={`Director: ${director}`} />
        <ListItemText primary={`Category: ${category}`} />
        <ListItemText primary={`Summary: ${movie.summary}`} />
        <ListItemText primary={`Price: $${movie.price}`} />
        <ListItemText primary={`Year: ${movie.year}`} />
        <ListItemText primary={`Copies In Stock: ${movie.stock}`} />
      </List>
      <Button
        variant="outlined"
        onClick={() => navigate(`/movie/${id.id}/update`)}
      >
        Update Movie
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/movie/${id.id}/delete`)}
      >
        Delete Movie
      </Button>
    </div>
  );
};

export default MovieDetail;
