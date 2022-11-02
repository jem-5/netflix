import React from "react";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import uniqid from "uniqid";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import Avatar from "@mui/material/Avatar";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalog/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Movies
      </Typography>
      <List className="movies">
        {movies.map((item) => {
          return (
            <div key={uniqid()}>
              <ListItem disablePadding className="card">
                <img src={item.img} alt="movie" className="movie-thumb" />
                <Avatar style={{ marginLeft: "10px" }}>
                  <MovieCreationIcon />
                </Avatar>

                {/* <ListItemAvatar>
                  <Avatar>
                    <MovieCreationIcon />
                  </Avatar>
                </ListItemAvatar> */}
                <ListItemButton component="a" href={`/movie/${item._id}`}>
                  <ListItemText
                    primary={item.title}
                    secondary={`Year: ${item.year}`}
                  />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Movies;
