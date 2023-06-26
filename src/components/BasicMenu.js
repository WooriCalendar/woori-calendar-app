import {
  Button,
  Fab,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

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
    <div>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        sx={{ borderRadius: "20px" }}
      >
        {/*<Fab variant="extended">*/}
        <AddIcon sx={{ mr: 1 }} />
        {t("Create")}
        {/*</Fab>*/}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link
          to={"/schedule"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="subtitle2">{t("Create schedule")}</Typography>
          </MenuItem>
        </Link>
        <Link
          to={"/calendar"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="subtitle2">
              {t("Create new calendar")}
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
};
export default BasicMenu;
