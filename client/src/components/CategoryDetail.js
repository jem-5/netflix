import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import uniqid from "uniqid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";

const CategoryDetail = () => {
  const id = useParams();
  const [category, setCategory] = useState([]);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/catalog/category/${id.id}`)
      .then((response) => {
        console.log(response.data.category_movies);
        setCategory(response.data.category.name);
        setCategoryMovies(response.data.category_movies);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(category);

  return (
    <div className="category-detail">
      <Typography variant="h6" gutterBottom>
        Category Detail: {category}
      </Typography>

      <List>
        {categoryMovies.map((item) => {
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
                    secondary={`${item.summary}`}
                  />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
      <Button
        variant="outlined"
        onClick={() => navigate(`/category/${id.id}/update`)}
      >
        Update Category
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/category/${id.id}/delete`)}
      >
        Delete Category
      </Button>
    </div>
  );
};

export default CategoryDetail;
