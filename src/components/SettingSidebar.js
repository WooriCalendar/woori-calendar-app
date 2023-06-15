import "../css/Sidebar.css";
import React from "react";
import Category from "./Category";
import { Container, Grid, Button, TextField } from "@mui/material";

// const SettingSidebar = () => {
//   return (
//     <Container>
//       <Grid>
//         <Category />
//       </Grid>
//     </Container>
//   );
// };
const SettingSidebar = ({ visible, aspectRatio, height, contentHeight }) => {
  const headerToolbar = {
    left: "",
    center: "",
    right: "",
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="slide-out" style={{ marginTop: "20px" }}>
        <Grid>내 정보</Grid>
        <Grid>내 정보</Grid>
        <Grid>내 정보</Grid>
        <Grid>내 정보</Grid>

        <form>
          <TextField label="검색" variant="outlined" size="small" />
        </form>
        <Category />
      </div>
    </div>
  );
};

export default SettingSidebar;
