import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

const MovieCreate = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [categories, setCategories] = useState([]);
  const [directors, setDirectors] = useState([]);
  const ref = useRef();

  const [movie, setMovie] = useState({
    title: title,
    director: director,
    summary: summary,
    category: category,
    year: year,
    price: price,
    stock: stock,
  });
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      axios
        .get(`http://localhost:3000/catalog/movie/${id}`)
        .then((resp) => {
          console.log(resp.data);
          setMovie(resp.data);
          setTitle(resp.data.title);
          setSummary(resp.data.summary);
          setYear(resp.data.year);
          setPrice(resp.data.price);
          setStock(resp.data.stock);
          setDirector(resp.data.director);
          setCategory(resp.data.category[0]);
          setUpdateMode(true);
          console.log(title);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalog/movie/create")
      .then((res) => {
        setCategories(res.data.categories);
        setDirectors(res.data.directors);
        console.log(directors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAdd = (e) => {
    console.log(movie);
    axios
      .post("http://localhost:3000/catalog/movie/create", {
        title: title,
        director: director,
        summary: summary,
        category: category,
        year: year,
        price: price,
        stock: stock,
      })
      .then((resp) => {
        console.log(resp.data);
        console.log("Success");
      })
      .catch((err) => {
        console.log("Failure");
        console.log(err.response);
      });
  };

  const handleUpdate = () => {
    console.log("UPDATE");
    axios
      .post(`http://localhost:3000/catalog/movie/${id}/update`, {
        title: title,
        director: director,
        summary: summary,
        category: category,
        year: year,
        price: price,
        stock: stock,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   if (id !== undefined) {
  //     axios
  //       .get(`http://localhost:3000/catalog/movie/${id}`)
  //       .then((resp) => {
  //         setMovie(resp.data);
  //         setTitle(movie.title);
  //         setSummary(movie.summary);
  //         setYear(movie.year);
  //         setPrice(movie.price);
  //         setStock(movie.stock);
  //         setDirector(movie.director);
  //         setCategory(movie.category);
  //         setUpdateMode(true);
  //         console.log(summary);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [id]);

  // console.log(directors.find((it) => it._id === director).name);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {updateMode ? "Update Movie" : "Add Movie"}
      </Typography>
      <Box
        component="form"
        method="post"
        action=""
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <TextField
          id="title"
          label="Title"
          name="title"
          ref={ref}
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          value={title || ""}
        />
        <TextField
          id="summary"
          label="Summary"
          name="summary"
          variant="standard"
          onChange={(e) => setSummary(e.target.value)}
          value={summary || ""}
        />
        <TextField
          id="year"
          label="Year"
          name="year"
          variant="standard"
          onChange={(e) => setYear(e.target.value)}
          value={year || ""}
        />
        <TextField
          id="price"
          label="Price"
          name="price"
          variant="standard"
          onChange={(e) => setPrice(e.target.value)}
          value={price || ""}
        />
        <TextField
          id="stock"
          label="Stock"
          name="stock"
          variant="standard"
          onChange={(e) => {
            setStock(e.target.value);
            console.log(movie);
          }}
          value={stock || ""}
        />

        <FormHelperText style={{ fontSize: "0.9em" }}>Director</FormHelperText>
        <Select
          style={{ marginTop: "0em", height: "2.5em", textAlign: "left" }}
          labelId="director-label"
          id="director-label"
          label="director-label"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        >
          {directors.map((item) => {
            return (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>

        <FormHelperText style={{ fontSize: "0.9em" }}>Category</FormHelperText>
        <Select
          style={{ marginTop: "0em", height: "2.5em", textAlign: "left" }}
          labelId="category"
          id="category  "
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            console.log(title);
          }}
        >
          {categories.map((item) => {
            return (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>

        <Button
          variant="contained"
          type="button"
          size="small"
          style={{ width: "0.8em" }}
          onClick={() => {
            console.log(movie);
            updateMode ? handleUpdate() : handleAdd();
            navigate("/movies");
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default MovieCreate;
