import { Container, TextField, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import MyPage from "./MyPage";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import Settings from "./Settings";
import ReactDOM from "react-dom";

const SettingPasword = () => {
  // handleClicked
  const [password, setPassword] = useState("");

  const [activeComponent, setActiveComponent] = useState(null);
  // const handleClick = (component) => {
  //   setActiveComponent(component);
  //   // handleClicked(component);
  // };

  const handleClick = () => {
    console.log(<Settings />);
    return <Settings value={true} />;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const editEventHandler = () => {
    // 패스워드 검증 로직 추가
    if (password === "올바른비밀번호") {
      console.log("비밀번호 검증 통과");
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <Container maxWidth="xs" style={{ marginTop: "1px", marginBottom: "10%" }}>
      <Grid
        container
        item
        xs={12}
        style={{ marginTop: "3%", marginBottom: "3%" }}
        spacing={2}
      ></Grid>
      <Grid container item xs={12}>
        {/* <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
        </Grid> */}
        <TextField
          variant="outlined"
          required
          fullWidth
          id="password"
          name="password"
          type="password"
          label="password"
          autoComplete="password"
          style={{ marginBottom: "2%" }}
          // onChange={handlePasswordChange}
        />
        <Grid item xs={6}></Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          xs={6}
          textAlign={"left"}
          style={{ paddingTop: "10px" }}
        ></Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          xs={6}
          textAlign={"left"}
          style={{ paddingTop: "10px" }}
        ></Grid>
        <Grid item xs={6} textAlign={"right"}></Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          xs={6}
          textAlign={"left"}
          style={{ paddingTop: "10px" }}
        ></Grid>
        <Grid item xs={6} textAlign={"right"}></Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          xs={6}
          textAlign={"left"}
          style={{ paddingTop: "10px" }}
        ></Grid>
      </Grid>
      <Grid item xs={6} textAlign={"right"}>
        <Grid style={{ marginBottom: "40px", marginTop: "10px" }}></Grid>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            className="invite"
            style={{ marginRight: "10px" }}
            // onClick={editEventHandler}
            onClick={() => handleClick()}
          >
            <Link to={"/MyPage"}>완료</Link>
            완료
          </Button>
          {/* <MyPage /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingPasword;
