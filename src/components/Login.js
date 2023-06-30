import React, { useEffect, useRef, useState } from "react";
import { call, signin, socialLogin } from "../service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginSvg from "./LoginSvg";
import companyLogo from "../assets/logo(ver3).png";
import { useTranslation } from "react-i18next";
/**
 * @author        : DGeon
 * @Comment       : 로그인, Oauth로그인
 * @date          : 2023-06-07
 *
 */
const Login = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  /**
   * @author        : DGeon
   * @Comment       : TextField에 입력된 email, password를 MemberDTO형태로 백엔드에 전송
   * @date          : 2023-06-07
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    // console.log("email", email);
    // console.log("password", password);
    // signin({email: email, password: password}).then((resp) => {
    //     console.log("login", resp);
    //
    //     // localStorage.setItem("email", email); 로컬스토리지에 이메일만 저장 필요없어짐
    // });

    call("/member/signin", "POST", { email: email, password: password })
      .then((response) => {
        // console.log("response : ", response);
        // alert('로그인 토큰 : ' + response.token);
        if (response.token) {
          localStorage.setItem("ACCESS_TOKEN", response.token);
          // alert(window.navigator.language);

          window.location.href = "/";
        }
      })
      .catch(() => {
        // alert("실패");
        document.getElementById("loginCheck").innerText = t("login fail");
        window.location.href = "/login";
      });
  };

  /**
   * @author        : DGeon
   * @Comment       : Google 로그인
   * @date          : 2023-06-07
   *
   */
  const handleSocialLogin = (provider) => {
    socialLogin(provider);
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
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "2%" }}
          >
            {t("Login")}
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              label={t("email")}
              autoComplete="email"
              style={{ marginBottom: "2%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <div id="loginCheck" style={{ color: "red" }}></div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t("Login")}
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ background: "#000" }}
                            onClick={() => {
                                handleSocialLogin("github");
                            }}
                        >
                            GitHub Login
                        </Button>
                    </Grid>*/}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              style={{ background: "#fff", color: "#000", marginBottom: "2%" }}
              onClick={() => {
                handleSocialLogin("google");
              }}
            >
              <LoginSvg />
              {t("Google Login")}
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="column" justify="space-between">
          <Grid item xs={12}>
            <Link to="/Signup" variant="body2">
              {t("Don't have an account? sign up here")}
            </Link>
          </Grid>
          <Grid item container justify="space-between">
            <Grid item xs={9}>
              <Link to="/Forgotpassword" variant="body2">
                {t("Forgot password?")}
              </Link>
            </Grid>
            <Grid item xs={3} container justify="flex-end">
              <Link to="/ForgotEmail" variant="body2">
                {t("Forgot email?")}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
