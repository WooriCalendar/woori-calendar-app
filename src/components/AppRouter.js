import { Box, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import SocialLogin from "./SocialLogin";
import App from "../App";
import Signup from "./Signup";
import CalModify from "./CalModify";
import PrivacyPolicyJa from "./PrivacyPolicyJa";
import PrivacyPolicyKo from "./PrivacyPolicyKo";
import PrivacyPolicyEn from "./PrivacyPolicyEn";
import Forgot from "./Forgotpassword";
import ScheduleCreate from "./ScheduleCreate";
import CalendarCreate from "./CalendarCreate";

/**
 * @author        : DGeon
 * @Comment       : 웹 하단에 표시 하는 부분
 * @date          : 2023-06-07
 *
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright &copy; Woori Calendar {new Date().getFullYear()}
    </Typography>
  );
}

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="socialLogin" element={<SocialLogin />} />
          <Route path="calendar/:calNo" element={<CalModify />} />
          <Route path="calModify" element={<CalModify />} />
          <Route path="PrivacyPolicyEn" element={<PrivacyPolicyEn />} />
          <Route path="PrivacyPolicyKo" element={<PrivacyPolicyKo />} />
          <Route path="PrivacyPolicyJa" element={<PrivacyPolicyJa />} />
          <Route path="Forgotpassword" element={<Forgot />}/>
          <Route path={"schedule"} element={<ScheduleCreate/>} />
          <Route path={"calendar"} element={<CalendarCreate/>} />
        </Routes>
      </BrowserRouter>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};

export default AppRouter;
