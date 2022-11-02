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
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import Avatar from "@mui/material/Avatar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalog/categories")
      .then((response) => {
        setCategories(response.data);
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
  }, [categories]);

  const countMovies = (id) => {
    let total = 0;
    movies.forEach((mov) => {
      if (mov.category.includes(id)) {
        total += 1;
      }
    });
    return total;
  };

  return (
    <div className="directors">
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((item) => {
          return (
            <div key={uniqid()}>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar>
                    <LocalMoviesIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemButton component="a" href={`/category/${item._id}`}>
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

export default Categories;
