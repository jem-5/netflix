import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import uniqid from "uniqid";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const DirectorDetail = () => {
  const id = useParams();
  const [director, setDirector] = useState([]);
  const [directorMovies, setDirectorMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/catalog/director/${id.id}`)
      .then((response) => {
        setDirector(response.data.director.name);
        setDirectorMovies(response.data.director_movies);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="director-detail">
      <Typography variant="h6" gutterBottom>
        Director Detail: {director}
      </Typography>

      <List>
        {directorMovies.map((item) => {
          return (
            <div key={uniqid()}>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar>
                    <MovieCreationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemButton component="a" href={`/movie/${item._id}`}>
                  <ListItemText
                    primary={item.title}
                    secondary={`Summary: ${item.summary}`}
                  />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
      <Button
        variant="outlined"
        onClick={() => navigate(`/director/${id.id}/update`)}
      >
        Update Director
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/director/${id.id}/delete`)}
      >
        Delete Director
      </Button>
    </div>
  );
};

export default DirectorDetail;
