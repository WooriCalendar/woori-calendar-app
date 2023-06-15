import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BackButton = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <ArrowBackIosIcon
      onClick={onClickBtn}
      fontSize="large"
      style={{
        color:
          // "#d2d8e0"
          "black",
        cursor: "pointer",
      }}
    />
    // <FontAwesomeIcon
    //   onClick={onClickBtn}
    //   icon={faAngleLeft}
    //   size="2xl"
    //   style={{ color: "#d2d8e0" }}
    // />
  );
};

const SettingNavigation = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container spacing={2} align-item="center">
          <Grid item xs={4} textAlign={"left"}>
            <BackButton classes="btn" variant="contained" />
          </Grid>

          <Grid item xs={4} textAlign={"center"} fontSize={"30px"}>
            설정
          </Grid>
          <Grid item xs={4} textAlign={"right"}>
            {/* <Button variant="contained">완료</Button> */}
          </Grid>
          {/* <Grid item style={{ marginTop: "10px" }}></Grid>
          <Grid item style={{ marginTop: "0px" }}></Grid>
          <Grid item style={{ marginTop: "10px" }}></Grid>
          <Grid item style={{ marginLeft: "auto", marginTop: "10px" }}></Grid> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default SettingNavigation;
