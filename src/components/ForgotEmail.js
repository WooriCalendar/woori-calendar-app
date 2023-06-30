import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import companyLogo from "../assets/logo(ver3).png";
import ForgotTextField from "./ForgotTextField";
import {
  call,
  findemail,
  forgotEmail,
  signupemail,
  signuppassword,
} from "../service/ApiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Oval, TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
const ForgotEmail = () => {
  const sliderRef = useRef(null);
  const [btnSendEmailDisabled, setBtnSendEmailDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [subemail, setEmail] = useState();
  const [loding, setLoding] = useState(true);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    draggable: false,
  };

  useEffect(() => {
    setEmail(document.getElementById("email").value);
    console.log(subemail);
  }, [subemail]);

  const handleEmail = () => {
    setLoding(false);
    // emailRef.current = document.getElementById('email').value;
    // let email = emailRef.current;
    // console.log(" emailRef.current :: " + emailRef.current);
    // console.log("발송전");
    setBtnSendEmailDisabled(true);
    call("/member/findemail", "POST", { subemail }).then((resp) => {
      if (resp.subemail) {
        setTimeout(() => {
          // findemail({email: subemail}).then((resp) => {
          console.log("발송완료");
          // setCode(resp);
          // console.log(code);
          setLoding(true);
          document.getElementById("emailCheck").innerText = t(
            "please check your email."
          );
          // });
        }, 100);
      } else {
        //없는 보조이메일
        document.getElementById("emailCheck").innerText = t(
          "This email is missing."
        );
        setLoding(true);
        setBtnSendEmailDisabled(false);
      }
    });
  };

  // useEffect(() => {  // Email 형식 체크
  //     var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  //     setEmailValid(regExp.test(email));
  // }, [email])
  //

  const handleEmailChange = (Email) => {
    setEmail(Email);
    // console.log(Email);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ marginTop: "8%", marginBottom: "2%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img
            src={companyLogo}
            alt="Woori. logo"
            style={{ width: "100%", marginBottom: "10%" }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            {t("Forgot Email")}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Slider ref={sliderRef} {...settings} style={{ height: "10%" }}>
            <div>
              <ForgotTextField
                value={{
                  value: "email",
                  btnSendEmailDisabled: btnSendEmailDisabled,
                }}
                onChange={handleEmailChange}
              />
              <div id="emailCheck" style={{ color: "red" }}></div>
              {loding ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  id={"nextBtn"}
                  onClick={handleEmail}
                  disabled={buttonDisabled}
                  style={{ marginTop: "5%" }}
                >
                  {t("Send")}
                </Button>
              ) : (
                <div style={{ width: 400, textAlign: "center", marginTop: 20 }}>
                  <div style={{ display: "inline-block" }}>
                    <TailSpin color="#7cc6ff" height={50} width={50} />
                  </div>
                </div>
              )}
            </div>
          </Slider>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Container>
  );
};

export default ForgotEmail;
