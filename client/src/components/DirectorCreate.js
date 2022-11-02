import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DirectorCreate = () => {
  const [director, setDirector] = useState(null);
  const directorInput = useRef();
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;
  console.log(id);

  const handleAdd = (e) => {
    axios
      .post("http://localhost:3000/catalog/director/create", { name: director })
      .then((resp) => {
        console.log(resp.data);
        console.log("Success");
      })
      .catch((err) => {
        console.log("Failure");
        console.log(err.data);
      });
  };

  const handleUpdate = () => {
    axios
      .post(`http://localhost:3000/catalog/director/${id}/update`, {
        name: director,
      })
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`http://localhost:3000/catalog/director/${id}`)
        .then((res) => {
          setDirector(res.data.director.name);
          setUpdateMode(true);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  console.log(director);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {updateMode ? "Update Director" : "Add Director"}
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
          ref={directorInput}
          label="Director Name"
          name="name"
          variant="standard"
          onChange={(e) => setDirector(e.target.value)}
          value={director || ""}
        />
        <Button
          variant="contained"
          type="button"
          size="small"
          style={{ width: "0.8em" }}
          onClick={() => {
            console.log(id);
            console.log("director", director);
            updateMode ? console.log("updat") : console.log("addd");
            updateMode ? handleUpdate() : handleAdd();
            navigate("/directors");
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default DirectorCreate;
