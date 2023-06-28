import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signout } from "../service/ApiService";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "../assets/logo(ver3)small.png";
import SelectLabel from "./SelectLabel";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";
import SearchModal from "./SearchModal";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Navigation = ({ SideBar, initialView, next, prev, today }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [searchModal, setSearchModal] = useState(false);

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

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

  const onSearchClick = () => {
    openSearchModal();
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container spacing={2} align-item="center">
            <Grid item style={{ marginTop: "10px" }}>
              <Button onClick={SideBar}>
                <FontAwesomeIcon
                  icon={faBars}
                  size="2xl"
                  style={{ color: "black" }}
                />
              </Button>
            </Grid>
            <Grid item style={{ marginTop: "0px" }}>
              <img src={logoImage} alt="Logo Image" />
            </Grid>
            <Grid item style={{ marginTop: "10px" }}>
              <Typography variant="h6">Woori Calendar</Typography>
            </Grid>
            <Grid item style={{ marginTop: "10px" }}>
              <Button onClick={today} style={{ color: "black" }}>
                {t("Today")}
              </Button>
              <Button onClick={prev} style={{ color: "black" }}>
                <ArrowBackIosNewIcon />
              </Button>
              <Button onClick={next} style={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Button>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginTop: "10px" }}>
              <Button onClick={onSearchClick} style={{ color: "black" }}>
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item style={{ marginLeft: "auto", marginTop: "10px" }}>
              <Notification />
            </Grid>
            <Grid item style={{ marginTop: "19px", marginRight: "7px" }}>
              <Link to="/Settings">
                <FontAwesomeIcon
                  fontSize="large"
                  icon={faGear}
                  style={{ color: "black" }}
                />
              </Link>
            </Grid>
            <Grid item>
              <SelectLabel initialView={initialView} />
            </Grid>
            <Grid item style={{ marginLeft: "0", marginTop: "10px" }}>
              <Button color="inherit" onClick={signout}>
                {t("Logout")}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <SearchModal open={searchModal} close={closeSearchModal} />
    </>
  );
};

export default Navigation;
