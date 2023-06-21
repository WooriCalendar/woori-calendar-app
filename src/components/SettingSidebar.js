import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import SettingPasword from "./SettingPasword";
import Category from "./Category";
import { call } from "../service/ApiService";
import LanguageSelector from "./LanguageSelector";

const SettingSidebar = ({ handleSidebarClick }) => {
  const [activeComponent, setActiveComponent] = useState("Settings");
  const [calendar, setCalendar] = useState({
    name: "",
    comment: "",
    timeZone: "",
    color: "",
  });
  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      console.log("333333333", response);
      if (response.data && response.data.length > 0) {
        setCalendar(response.data[0]);
      }
    });
  }, []);
  const handleClick = (component) => {
    setActiveComponent(component);
    handleSidebarClick(component);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ marginTop: "20px" }}>
        <Grid>
          <Button onClick={() => handleClick("Settings")}>Settings</Button>
        </Grid>
        {/* <Grid>
          <Button onClick={() => handleClick("MyPage")}>My Page</Button>
        </Grid> */}
        <Grid>
          <Button onClick={() => handleClick("SettingPasword")}>My Page</Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleClick("Category")}>
            {calendar && calendar.name}
          </Button>
          <Button
            defaultValue={calendar.name}
            onClick={() => handleClick("Category")}
          ></Button>
          {/* {activeComponent === "Settings" && <LanguageSelector />} */}
        </Grid>
      </div>
    </div>
  );
};

export default SettingSidebar;
