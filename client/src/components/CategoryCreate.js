import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryCreate = () => {
  const [category, setCategory] = useState(null);
  const categoryInput = useRef();
  const [updateMode, setUpdateMode] = useState(false);

  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);

  const handleAdd = (e) => {
    axios
      .post("/catalog/category/create", { name: category })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log("Failure");
        console.log(err.data);
      });
  };

  const handleUpdate = () => {
    axios
      .post(`/catalog/category/${id}/update`, {
        name: category,
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/catalog/category/${id}`)
        .then((res) => {
          setCategory(res.data.category.name);
          setUpdateMode(true);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  console.log(category);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {updateMode ? "Update Category" : "Add Category"}
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
          id="name"
          ref={categoryInput}
          label="Category Name"
          name="name"
          variant="standard"
          onChange={(e) => setCategory(e.target.value)}
          value={category || ""}
        />
        <Button
          variant="contained"
          type="button"
          size="small"
          style={{ width: "0.8em" }}
          onClick={() => {
            updateMode ? handleUpdate() : handleAdd();
            navigate("/categories");
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default CategoryCreate;
