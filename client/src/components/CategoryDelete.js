import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import uniqid from "uniqid";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
// import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CategoryDelete = () => {
  const id = useParams();
  const [category, setCategory] = useState(null);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/catalog/category/${id.id}/delete`)
      .then((resp) => {
        console.log(resp.data);
        setCategory(resp.data.category.name);
        setCategoryMovies(resp.data.category_movies);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [id.id]);

  const deleteCategory = () => {
    axios
      .post(`http://localhost:3000/catalog/category/${id.id}/delete`, id.id)
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.data));
  };

  return (
    <div className="category-delete">
      <Typography variant="h6" gutterBottom>
        Delete Category: {category}
      </Typography>

      {categoryMovies.length > 0 ? (
        <div>
          <Typography variant="p" gutterBottom>
            Please note that you must delete the category's existing movies
            before you may delete the category.
          </Typography>
          <List>
            {categoryMovies.map((item) => {
              return (
                <ListItem key={uniqid()}>
                  <ListItemButton component="a" href={`/movie/${item._id}`}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      ) : (
        <div>
          <Typography variant="p" gutterBottom>
            Are you sure you want to delete this category?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              deleteCategory();
              navigate("/categories");
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryDelete;
