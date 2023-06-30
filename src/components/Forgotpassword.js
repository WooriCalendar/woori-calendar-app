import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import companyLogo from "../assets/logo(ver3).png";
import ForgotTextField from "./ForgotTextField";
import { call, signupemail, signuppassword } from "../service/ApiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Oval, TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
const Forgotpassword = () => {
  const emailRef = useRef();
  const sliderRef = useRef(null);

  const [code, setCode] = useState();
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState();

  const [btnSendEmailDisabled, setBtnSendEmailDisabled] = useState(false);
  const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
  const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [sendCodeConfirmDisabled, setSendCodeConfirmDisabled] = useState(false);
  const [display, setDisplay] = useState("none");

  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [passwordCheckDisabled, setPasswordCheckDisabled] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [password, setPassword] = useState();

  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState();
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

  const [loding, setLoding] = useState(true);
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  useEffect(() => {
    setEmail(document.getElementById("email").value);
    console.log(email);
  }, [email]);

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = () => {
    setLoding(false);
    // emailRef.current = document.getElementById('email').value;
    // let email = emailRef.current;
    // console.log(" emailRef.current :: " + emailRef.current);
    // console.log("발송전");
    setBtnSendEmailDisabled(true);
    call("/member/findemail", "POST", { email }).then((resp) => {
      if (resp.email) {
        setTimeout(() => {
          signuppassword({
            email: email,
            language: window.navigator.language,
          }).then((resp) => {
            // console.log("발송완료");
            setCode(resp);
            // console.log(code);
            setEmailConfirm(email);
            setDisplay("block");

            setIsCodeVisible(true);
            setLoding(true);
          });
        }, 100);
      } else {
        //중복된 이메일
        document.getElementById("emailCheck").innerText = t(
          "This email is missing."
        );
        setLoding(true);
        setBtnSendEmailDisabled(false);
      }
    });
  };

  const confirm = () => {
    let confirmCode = document.getElementById("code").value;
    // alert("code::"+ code);
    // alert("confirmCode::"+ confirmCode);
    if (
      code === confirmCode &&
      emailConfirm === document.getElementById("email").value
    ) {
      // console.log("일치함");
      setSendEmailDisabled(true);
      setSendCodeDisabled(true);
      setSendCodeConfirmDisabled(true);
      setButtonDisabled(false);
    } else {
      alert(t("It doesn't match. please verify again"));
    }
  };

  // useEffect(() => {  // Email 형식 체크
  //     var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  //     setEmailValid(regExp.test(email));
  // }, [email])
  //
  const resetBtn = (e) => {
    document.getElementById("email").value = "";
    document.getElementById(t("code")).value = null;
    setSendEmailDisabled(false);
    setSendCodeDisabled(false);
    setBtnSendEmailDisabled(false);
    setSendCodeConfirmDisabled(false);
    e.target.display = "block";
  };
  const nextBtn = (event) => {
    sliderRef.current.slickNext();
    event.preventDefault();
    if (
      passwordRegEx.test(document.getElementById("password").value) &&
      passwordRegEx.test(document.getElementById("passwordcheck").value)
    ) {
      if (
        document.getElementById("password").value ===
        document.getElementById("passwordcheck").value
      ) {
        event.preventDefault();
        // setPassword(document.getElementById('password').value);
        document.getElementById("nextBtn").innerText = t("Change Password");
        setIsCheck(true);
      } else {
        event.preventDefault();
        document.getElementById("passwordOut").innerText = t(
          "Passwords do not match."
        );
      }
    } else {
      event.preventDefault();
      document.getElementById("passwordOut").innerText = t(
        "Please enter a password between 8 and 20 characters with a mixture of uppercase and lowercase letters and numbers."
      );
    }
    if (isCheck) {
      call("/member/updatePassword", "PUT", { email, password }).then(() => {
        window.location.href = "/login";
      });
    }
  };

  const handleEmailChange = (Email) => {
    setEmail(Email);
    console.log(Email);
  };

  const handleCodeChange = (code) => {
    console.log(code);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    console.log(password);
  };

  const handlePasswordChangeCheck = (passwordCheck) => {
    // set(passwordCheck);
    console.log(passwordCheck);
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
            {t("Forgot Password")}
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
                  onClick={handleEmail}
                  id="sendEmail"
                  disabled={sendEmailDisabled}
                >
                  {t("Send verification code")}
                </Button>
              ) : (
                <div style={{ width: 400, textAlign: "center", marginTop: 20 }}>
                  <div style={{ display: "inline-block" }}>
                    <TailSpin color="#7cc6ff" height={50} width={50} />
                  </div>
                </div>
              )}

              {isCodeVisible ? (
                <div>
                  {/*onChange={handleCodeChange}*/}
                  <ForgotTextField
                    value={{
                      value: "code",
                      sendCodeDisabled: sendCodeDisabled,
                    }}
                    onChange={handleCodeChange}
                  />
                  <Button
                    id="confirm"
                    onClick={confirm}
                    disabled={sendCodeDisabled}
                  >
                    {t("Confirm verification code")}
                  </Button>
                </div>
              ) : (
                ""
              )}
              <Button
                fullWidth
                variant="contained"
                color="success"
                id={"resetBtn"}
                onClick={resetBtn}
                style={{ display }}
              >
                {t("reset")}
              </Button>

              {/*loading ? ( <h1>메일 발송중..</h1> ):''*/}
            </div>
            <form noValidate>
              <div>
                <ForgotTextField
                  value={{ value: "password" }}
                  disabled={passwordDisabled}
                  onChange={handlePasswordChange}
                />
                <ForgotTextField
                  value={{ value: "passwordcheck" }}
                  disabled={passwordCheckDisabled}
                  onChange={handlePasswordChangeCheck}
                />
                <div id="passwordOut" style={{ color: "red" }}></div>
              </div>
            </form>
          </Slider>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            id={"nextBtn"}
            onClick={nextBtn}
            disabled={buttonDisabled}
          >
            {t("Next")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forgotpassword;
