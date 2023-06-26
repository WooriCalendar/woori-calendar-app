import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { call, fetchMemberData } from "../service/ApiService.js";
import NicnameModal from "./NicnameModal";
import moment from "moment";
import BirthModal from "./BirthModal.js";
import SubEmailModal from "./SubEmailModal.js";
import PasswordModal from "./PasswordModal.js";
import MemberDelete from "./MemberDelete.js";
import { useTranslation } from "react-i18next";

const MyPage = () => {
  const [member, setMember] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [bmodalOpen, setBmodalOpen] = useState(false);
  const [cmodalOpen, setCmodalOpen] = useState(false);
  const [dmodalOpen, setDmodalOpen] = useState(false);
  const [fmodalOpen, setFmodalOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();

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
  const fopenModal = () => {
    setFmodalOpen(true);
  };
  const fcloseModal = () => {
    setFmodalOpen(false);
  };

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response);
      console.log("123123123", response);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

  const handleLanguageChange = (selectedLanguage) => {
    const updatedData = {
      ...member,
      language: selectedLanguage,
    };

    call("/member", "PUT", updatedData).then((response) => {
      console.log("response:::", response);
      console.log("언어 업데이트 성공");
      setMember(updatedData);
      i18n.changeLanguage(selectedLanguage);
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
          {t("email")}
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input3"
            label={t("email")}
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
          {t("nickname")}
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input1"
            label={t("nickname")}
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
          {t("birthday")}
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input2"
            label={t("birthday")}
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
          {t("subemail")}
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <TextField
            id="standard-read-only-input"
            label={t("subemail")}
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
          {t("language")}
        </Grid>
        <Grid item xs={6} textAlign={"right"}>
          <select
            // value={member.language}
            label={t("language")}
            // label={member.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{ width: "200px", height: "40px" }}
          >
            <option value="ko">{t("korean")}</option>
            <option value="ja">{t("japanese")}</option>
            <option value="en">{t("english")}</option>
          </select>
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: "40px", marginTop: "40px" }}>
        <Button variant="outlined" onClick={dopenModal}>
          {t("Change Password")}
        </Button>
      </Grid>
      <PasswordModal open={dmodalOpen} close={dcloseModal} />
      <Grid>
        <Button variant="outlined" color="error" onClick={fopenModal}>
          {t("withdrawal")}
        </Button>
        <MemberDelete open={fmodalOpen} close={fcloseModal} />
      </Grid>
    </Container>
  );
};

export default MyPage;
