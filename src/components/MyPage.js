import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { call } from "../service/ApiService.js";
import NicnameModal from "./NicnameModal";
import moment from "moment";
import BirthModal from "./BirthModal.js";
import SubEmailModal from "./SubEmailModal.js";
import PasswordModal from "./PasswordModal.js";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
const MyPage = () => {
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [bmodalOpen, setBmodalOpen] = useState(false);
  const [cmodalOpen, setCmodalOpen] = useState(false);
  const [dmodalOpen, setDmodalOpen] = useState(false);
  const [language, setLanguage] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const bopenModal = () => {
    setBmodalOpen(true);
  };
  const bcloseModal = () => {
    setBmodalOpen(false);
  };
  const copenModal = () => {
    setCmodalOpen(true);
  };
  const ccloseModal = () => {
    setCmodalOpen(false);
  };
  const dopenModal = () => {
    setDmodalOpen(true);
  };
  const dcloseModal = () => {
    setDmodalOpen(false);
  };

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response);
      console.log("123123123", response);
    });
  });

  // useState(() => {
  //   call("/member", "GET", null).then((response) => {
  //     setMember(response);
  //     console.log("123123123", response);
  //   });
  // });
  const handleLanguageChange = (selectedLanguage) => {
    const updatedData = {
      ...member,
      language: selectedLanguage,
    };

    call("/member", "PUT", updatedData).then((response) => {
      console.log("response:::", response);
      console.log("언어 업데이트 성공");
    });
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
            onClick={bopenModal}
          />
          <BirthModal open={bmodalOpen} close={bcloseModal} />
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
            onClick={copenModal}
          />
          <SubEmailModal open={cmodalOpen} close={ccloseModal} />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={6} textAlign={"left"} style={{ paddingTop: "10px" }}>
          언어
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          {/* <TextField
            id="standard-read-only-input"
            // label="보조 이메일"
            value={member.language || ""}
            variant="standard"
            style={{ marginBottom: "20px" }}
            onClick={copenModal}
          /> */}
          {/* <Box sx={{ minWidth: 60 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={member.language}
                // label={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <MenuItem value="ko">한국어</MenuItem>
                <MenuItem value="ja">日本語</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <select
            // value={member.language}
            label={member.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{ width: "200px", height: "40px" }}
          >
            <option value="ko">한국어</option>
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
          {/* <Grid container style={{ marginTop: 20 }}>
            <TextField
              select
              style={{ width: 400 }}
              label={member.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              // onChange={handleLanguageChange}
            >
              {/* {member.language.map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))} */}
          {/* <MenuItem value="ko">한국어</MenuItem>
              <MenuItem value="ja">日本語</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </TextField>
          </Grid> * */}
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: "40px", marginTop: "10px" }}>
        <Button variant="outlined" onClick={dopenModal}>
          비밀번호 변경
        </Button>
      </Grid>
      <PasswordModal open={dmodalOpen} close={dcloseModal} />
      <Grid>
        <Button variant="outlined" color="error">
          회원탈퇴
        </Button>
      </Grid>
    </Container>
  );
};

export default MyPage;
