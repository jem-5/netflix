import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PortraitIcon from "@mui/icons-material/Portrait";
import Carousel from "better-react-carousel";

const Home = () => {
  const date = new Date().toLocaleString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [titles, setTitles] = useState(null);
  const [categories, setCategories] = useState(null);
  const [directors, setDirectors] = useState(null);
  const [copies, setCopies] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios("/catalog")
      .then((response) => {
        setTitles(response.data.movie_count);
        setCategories(response.data.category_count);
        setDirectors(response.data.director_count);
        setCopies(
          response.data.movie_available_count.reduce(
            (prev, curr) => prev + curr.stock,
            0
          )
        );
        setImages(
          response.data.movie_available_count.map(function (mov) {
            return mov.img;
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(images);

  return (
    <div className="home">
      <Carousel
        cols={3}
        rows={1}
        gap={5}
        loop
        autoplay={2000}
        hideArrow
        containerClassName="carousel"
      >
        {images.map((mov) => {
          return (
            <Carousel.Item>
              <img width="100%" height="350px" src={mov} alt="movie" />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <List
        className="stats"
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <Typography variant="p">Current Inventory as of {date}</Typography>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MovieCreationIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Titles: ${titles}`}
            secondary="wide variety of trending films"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <RadioButtonCheckedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Copies: ${copies}`}
            secondary="in-stock DVDs available for purchase"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalMoviesIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Categories: ${categories}`}
            secondary="popular genres sure to entertain"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PortraitIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Directors: ${directors}`}
            secondary="famous award-winning directors"
          />
        </ListItem>
      </List>
    </div>
  );
};

export default Home;
