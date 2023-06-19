import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
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
  );
};

const SettingNavigation = ({ selectedCategory }) => {
  const getCategoryTitle = (selectedCategory) => {
    if (selectedCategory === "SettingPasword") {
      return "내 정보";
    } else if (selectedCategory === "Category") {
      return "인생이여";
    } else if (selectedCategory === "CalModify") {
      return "태수의 캘린더";
    }
    // 기본값 또는 빈 상태 처리
    return "설정";
  };
  const categoryTitle = getCategoryTitle(selectedCategory);
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Grid container spacing={2} align-item="center">
          <Grid item xs={4} textAlign={"left"}>
            <BackButton classes="btn" variant="contained" />
          </Grid>

          <Grid item xs={4} textAlign={"center"} fontSize={"30px"}>
            <Typography variant="h6">{categoryTitle}</Typography>
            {/* {console.log("123123213", selectedCategory)} */}
          </Grid>
          <Grid item xs={4} textAlign={"right"}></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default SettingNavigation;
