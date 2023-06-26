import React, { useEffect, useState } from "react";
import PrivacyPolicyKo from "./PrivacyPolicyKo.js";
import PrivacyPolicyEn from "./PrivacyPolicyEn.js";
import PrivacyPolicyJa from "./PrivacyPolicyJa.js";
import { call, fetchMemberData } from "../service/ApiService.js";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setUserData(response);
      setLanguage(response.language);
      console.log(response.language);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

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
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    });
  };

  return (
    <div style={{ alignContent: "center" }}>
      <div style={{ textAlign: "center", fontSize: "30px" }}>
        {t("language")}:{" "}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{ marginLeft: "20px", fontSize: "30px" }}
        >
          <option value="ko">{t("korean")}</option>
          <option value="ja">{t("japanese")}</option>
          <option value="en">{t("english")}</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
