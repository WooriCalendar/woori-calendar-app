import React, { useState, useEffect } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const getCategoryTitle = (selectedCategory) => {
    if (selectedCategory === "SettingPasword") {
      return t("My Page");
    } else if (selectedCategory === "Category") {
      return t("Modifying the Calendar");
    } else if (selectedCategory === "Settings") {
      return t("Settings");
    }
    // 기본값 또는 빈 상태 처리
    return t("Settings");
  };
  const categoryTitle = getCategoryTitle(selectedCategory);

  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const memberLanguage = memberData.language; // 멤버 데이터에서 언어 값을 추출
        setLanguage(memberLanguage); // 언어 값을 상태에 설정
        i18n.changeLanguage(memberLanguage); // 언어 값을 i18n에 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    loadData();
  }, [i18n]);
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
