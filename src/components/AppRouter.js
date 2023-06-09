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
import NotFound from "./NotFound";
import Settings from "./Settings";
import MyPage from "./MyPage";
import SettingNavigation from "./SettingNavigation";
import ForgotEmail from "./ForgotEmail";

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
          <Route path="PrivacyPolicyEn" element={<PrivacyPolicyEn />} />
          <Route path="PrivacyPolicyKo" element={<PrivacyPolicyKo />} />
          <Route path="PrivacyPolicyJa" element={<PrivacyPolicyJa />} />
          <Route path="Forgotpassword" element={<Forgot />} />
          <Route path="ForgotEmail" element={<ForgotEmail />} />
          <Route path={"schedule"} element={<ScheduleCreate />} />
          <Route path={"calendar"} element={<CalendarCreate />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="SettingNavigation" element={<SettingNavigation />} />
        </Routes>
      </BrowserRouter>
      {/*<Box mt={5}>*/}
      {/*  <Copyright />*/}
      {/*</Box>*/}
    </div>
  );
};

export default AppRouter;
