import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/">
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/movies">
                  <ListItemText primary="All Movies" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/directors">
                  <ListItemText primary="All Directors" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/categories">
                  <ListItemText primary="All Categories" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/movie/create">
                  <ListItemText secondary="Create new movie" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/director/create">
                  <ListItemText secondary="Create new director" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/category/create">
                  <ListItemText secondary="Create new category" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Sidebar;
