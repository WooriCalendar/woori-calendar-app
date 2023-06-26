import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";
/**
 * @author: DGeon
 * @comment: 회원정보를 위한 컴포넌트
 * @date: 2023-06-08
 */
const PasswordTextField = (props) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

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
  return (
    <TextField
      variant="outlined"
      required
      fullWidth
      id={props.value}
      name={props.value}
      label={t(props.value)}
      type={
        props.value === "password"
          ? "password"
          : props.value === "passwordcheck"
          ? "password"
          : ""
      }
      autoComplete={props.value}
      style={{ marginTop: "5%" }}
      tabIndex={-1}
      onBlur={props.checkEmail}
    />
  );
};

export default PasswordTextField;
