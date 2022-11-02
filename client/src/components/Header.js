import React from "react";
import Typography from "@mui/material/Typography";
const Header = ({ title }) => {
  return (
    <div className="header">
      <div>
        <Typography
          variant="h2"
          style={{
            fontFamily: "Mukta",
            color: "#AE2616",
            marginBottom: 0,
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="p"
          style={{ fontFamily: "Mukta", color: "white" }}
          gutterBottom
        >
          An Inventory Management App
        </Typography>
      </div>
    </div>
  );
};

export default Header;
