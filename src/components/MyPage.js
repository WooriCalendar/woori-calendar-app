import { Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { call } from "../service/ApiService.js";
import NicnameModal from "./NicnameModal";
import moment from "moment";

const MyPage = () => {
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useState(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response);
      console.log("123123123", response);
    });
  });

  return (
    <Container maxWidth="xs" style={{ marginTop: "8%", marginBottom: "10%" }}>
      <Grid
        container
        item
        xs={12}
        style={{ marginTop: "3%", marginBottom: "3%" }}
        spacing={2}
      >
        <Grid item xs={4} textAlign={"left"}></Grid>
        <Grid item xs={4} textAlign={"center"}>
          설정
        </Grid>
        <Grid item xs={4} textAlign={"right"}></Grid>
      </Grid>
      <hr
        style={{
          border: "1px solid black",
          marginTop: "3%",
          marginBottom: "3%",
        }}
      />
      <Grid container item xs={12}>
        <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
          이메일
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input3"
            label="이메일"
            // defaultValue={member.email}
            value={member.email || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
          닉네임
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input1"
            label="닉네임"
            value={member.nickname || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            style={{ marginBottom: "20px" }}
            onClick={openModal}
          />
          <NicnameModal open={modalOpen} close={closeModal} />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
          생년월일
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input2"
            // label="생년월일"
            value={moment(member.birthday).format("YYYY-MM-DD") || ""} //서브스트링으로 뒤에 시간 뜨는거 지우고
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
          보조이메일
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input"
            // label="보조 이메일"
            value={member.subemail || ""}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: "40px", marginTop: "10px" }}>
        비밀번호 변경
      </Grid>
      <Grid style={{ color: "red" }}>회원탈퇴</Grid>
    </Container>
  );
};

export default MyPage;
