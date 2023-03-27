import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MovieDelete = () => {
  const [movie, setMovie] = useState(null);
  const id = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/catalog/movie/${id.id}/delete`)
      .then((resp) => setMovie(resp.data.title))
      .catch((err) => console.log(err));
  }, [id.id]);

  const deleteMovie = () => {
    axios
      .post(`/catalog/movie/${id.id}/delete`)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  return (
    <div className="movie-delete">
      <Typography variant="h6" gutterBottom>
        Delete Movie: {movie}
      </Typography>
      <Typography variant="p" gutterBottom>
        Are you sure you want to delete this movie?
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          deleteMovie();
          navigate("/movies");
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default MovieDelete;
