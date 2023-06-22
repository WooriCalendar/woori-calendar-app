import { Container, TextField, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyPage from "./MyPage";
import { call, checkPassword } from "../service/ApiService.js";

const SettingPassword = ({ setShowMyPage }) => {
  const [password, setPassword] = useState("");
  const [member, setMember] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response.email);
      console.log("123123123", response.email);
    });
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  console.log("9999999999999999999999999999999999", password);
  console.log("9999999999999999999999999999999999", member);
  const handleSubmit = (e) => {
    e.preventDefault();

    checkPassword({ email: member, password: password })
      .then((resp) => {
        if (resp) {
          setIsCompleted(true);
          alert("비밀번호가 일치합니다");
        }
      })
      .catch(() => {
        document.getElementById("passwordOut").innerText =
          "Passwords do not match.";
      });
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "1px", marginBottom: "10%" }}>
      {!isCompleted && (
        <form noValidate onSubmit={handleSubmit}>
          <Grid
            container
            item
            xs={12}
            style={{ marginTop: "3%", marginBottom: "3%" }}
            spacing={2}
          >
            <Grid container item xs={12}>
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
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid id="passwordOut" style={{ color: "red" }} item xs={6}></Grid>

            <Grid item xs={6} textAlign={"right"}>
              <Grid>
                <Button type="submit" variant="contained" className="invite">
                  완료
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
      {isCompleted && <MyPage />}
    </Container>
  );
};

export default SettingPassword;
