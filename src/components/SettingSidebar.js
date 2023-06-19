import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import SettingPasword from "./SettingPasword";

const SettingSidebar = ({ handleSidebarClick }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const handleClick = (component) => {
    setActiveComponent(component);
    handleSidebarClick(component);
    // if (component === "MyPage") {
    //   setIsPasswordModalOpen(true);
    // }
  };
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div className="slide-out" style={{ marginTop: "20px" }}>
        <Grid>
          <Button onClick={() => handleClick("MyPage")}>My Page</Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleClick("SettingPasword")}>
            Password
          </Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleClick("Category")}>캘린더 수정</Button>
        </Grid>
        <Grid>
          <Button onClick={() => handleClick("CalModify")}>
            캘린더 aksemf
          </Button>
        </Grid>
      </div>
      {/* <SettingPasswordModal
        open={isPasswordModalOpen}
        close={handleClosePasswordModal}
      /> */}
    </div>
  );
};

export default SettingSidebar;
