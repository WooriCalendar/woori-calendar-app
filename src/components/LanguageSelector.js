import React, { useEffect, useState } from "react";
import PrivacyPolicyKo from "./PrivacyPolicyKo.js";
import PrivacyPolicyEn from "./PrivacyPolicyEn.js";
import PrivacyPolicyJa from "./PrivacyPolicyJa.js";
import { call } from "../service/ApiService.js";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    call("/member", "GET", null)
      .then((response) => {
        setUserData(response);
        setLanguage(response.language);
        console.log(response.language);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  }, []);

  const handleLanguageChange = (selectedLanguage) => {
    const updatedData = {
      ...userData,
      language: selectedLanguage,
    };
    console.log("byun:::", userData);
    console.log("upda:::", updatedData);

    call("/member", "PUT", updatedData).then((response) => {
      console.log("response:::", response);
      console.log("언어 업데이트 성공");
    });
  };

  return (
    <div style={{ alignContent: "center" }}>
      <div style={{ textAlign: "center", fontSize: "30px" }}>
        언어
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{ marginLeft: "20px", fontSize: "30px" }}
        >
          <option value="ko">한국어</option>
          <option value="ja">日本語</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
