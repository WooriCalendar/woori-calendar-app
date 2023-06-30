import { Container, TextField, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyPage from "./MyPage";
import { call, checkPassword, fetchMemberData } from "../service/ApiService.js";
import { useTranslation } from "react-i18next";
import SocialDeleteModal from "./SocialDeleteModal";
const SettingPassword = ({ setShowMyPage }) => {
  const [password, setPassword] = useState("");
  const [member, setMember] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [isProvider, setIsProvider] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response.email);
      console.log("123123123", response);
      setIsProvider(response.auth_Provider);
      console.log("response.auth_Provider::::::::::" + response.auth_Provider);
    });
  }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const memberLanguage = memberData.language; // 멤버 데이터에서 언어 값을 추출
        setLanguage(memberLanguage); // 언어 값을 상태에 설정
        i18n.changeLanguage(memberLanguage); // 언어 값을 i18n에 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    loadData();
  }, [i18n]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // console.log("9999999999999999999999999999999999", password);
  // console.log("9999999999999999999999999999999999", member);
  const handleSubmit = (e) => {
    e.preventDefault();

    checkPassword({ email: member, password: password }).then((resp) => {
      if (resp) {
        setIsCompleted(true);
        // alert("비밀번호가 일치합니다");
      } else {
        document.getElementById("passwordOut").innerText = t(
          t("Passwords do not match.")
        );
      }
    });
  };

  return (
    <>
      {isProvider !== null ? (
        <>
          <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
            {t("SNS login cannot edit member information")}
          </h1>
          <Grid>
            <Button
              style={{
                float: "right",
              }}
              variant="outlined"
              color="error"
              onClick={openModal}
            >
              {t("withdrawal")}
            </Button>
            <SocialDeleteModal open={modalOpen} close={closeModal} />
          </Grid>
        </>
      ) : (
        <>
          <Container
            maxWidth="xs"
            style={{ marginTop: "1px", marginBottom: "10%" }}
          >
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
                      label={t("password")}
                      autoComplete="password"
                      style={{ marginBottom: "2%" }}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid
                    id="passwordOut"
                    style={{ color: "red" }}
                    item
                    xs={6}
                  ></Grid>

                  <Grid item xs={6} textAlign={"right"}>
                    <Grid>
                      <Button
                        type="submit"
                        variant="contained"
                        className="invite"
                      >
                        {t("Complete")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
            {isCompleted && <MyPage />}
          </Container>
        </>
      )}
    </>
  );
};

export default SettingPassword;
