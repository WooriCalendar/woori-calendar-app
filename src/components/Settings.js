import React, { useState } from "react";
import SettingNavigation from "./SettingNavigation";
import SettingSidebar from "./SettingSidebar";
import { Button, Grid } from "@mui/material";
import CalModify from "./CalModify";
import NicnameModal from "./NicnameModal";
import MyPage from "./MyPage";
import Category from "./Category";
import SettingPasword from "./SettingPasword";

const Settings = (props) => {
  console.log("밸류::::" + props.value);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleSidebarClick = (component) => {
    setActiveComponent(component);
    setSelectedComponent(component);
    console.log("asdasdasdasd00+", component);
  };

  const renderComponent = (props) => {
    if (activeComponent === "SettingPasword") {
      return <SettingPasword />;
    } else if (activeComponent === "Category") {
      return <Category />;
    } else if (activeComponent === "CalModify") {
      return <CalModify />;
    } else if (activeComponent === "Mypage") {
      return <MyPage />;
    }
    return (
      <React.Fragment>
        {/* <CalModify /> */}
        <Grid></Grid>
      </React.Fragment>
    );
  };

  const handleClicked = (component) => {
    setActiveComponent(component);
    setSelectedComponent(component);
  };

  const renderCom = () => {
    if (activeComponent === "MyPage") {
      return <MyPage />;
    }
    return (
      <React.Fragment>
        <Grid></Grid>
      </React.Fragment>
    );
  };
  return (
    <div>
      <Grid container item xs={12}>
        <SettingNavigation selectedCategory={selectedComponent} />
        {console.log("888888888888888888888", selectedComponent)}
        <Grid item xs={2}>
          <SettingSidebar handleSidebarClick={handleSidebarClick} />
          {console.log("888988888", handleSidebarClick)}
        </Grid>
        <Grid style={{ margin: "30px" }} item xs={9}>
          <Grid container item xs={12}>
            <Grid style={{ margin: "30px" }} item xs={9}>
              {renderComponent()}
              {/* {renderCom()} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
