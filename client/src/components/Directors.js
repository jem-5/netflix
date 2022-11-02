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
import PortraitIcon from "@mui/icons-material/Portrait";
import Avatar from "@mui/material/Avatar";

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalog/directors")
      .then((response) => {
        setDirectors(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalog/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const countMovies = (id) => {
    let total = 0;
    movies.forEach((mov) => {
      if (mov.director === id) {
        total += 1;
      }
    });
    return total;
  };

  return (
    <div className="directors">
      <Typography variant="h6" gutterBottom>
        Directors
      </Typography>
      <List>
        {directors.map((item) => {
          return (
            <div key={uniqid()}>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar>
                    <PortraitIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemButton component="a" href={`/director/${item._id}`}>
                  <ListItemText
                    primary={item.name}
                    secondary={`${countMovies(item._id)} titles`}
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

export default Directors;
