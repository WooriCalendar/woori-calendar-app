import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { call } from "../service/ApiService.js";

const MyPage = () => {
  const [email, setEmail] = useState("");
  useState(() => {
    call("/member", "GET", null).then((response) => {
      setEmail(response);
      console.log(response);
    });
  });

  return (
    <Container>
      <Grid>이메일</Grid>
      {email.email}
      <Grid>닉네임</Grid>
      {email.nickname}
      <Grid></Grid>
    </Container>
  );
};

export default MyPage;
