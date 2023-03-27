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

const DirectorDelete = () => {
  const [director, setDirector] = useState(null);
  const [directorMovies, setDirectorMovies] = useState([]);

  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {
    axios
      .get(`/catalog/director/${id.id}/delete`)
      .then((resp) => {
        console.log(resp.data);
        setDirector(resp.data.director.name);
        setDirectorMovies(resp.data.director_movies);
        console.log(directorMovies);
      })
      .catch((err) => {
        console.log("Failure");
        console.log(err.data);
      });
  }, [director, id.id]);

  const deleteDirector = () => {
    axios
      .post(`/catalog/director/${id.id}/delete`, id.id)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Failure");
        console.log(err.data);
      });
  };

  return (
    <div className="director-delete">
      <Typography variant="h6" gutterBottom>
        Delete Director: {director}
      </Typography>

      {directorMovies.length > 0 ? (
        <div>
          <Typography variant="p" gutterBottom>
            Please note that you must delete the director's existing movies
            before you may delete the director.
          </Typography>
          <List>
            {directorMovies.map((item) => {
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
            Are you sure you want to delete this director?
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              deleteDirector();
              navigate(`/directors`);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default DirectorDelete;
