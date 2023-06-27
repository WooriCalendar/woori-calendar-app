import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";
const SelectLabel = ({ initialView }) => {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState("dayGridMonth");
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

  const handleChange = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
    initialView(event);
  };

  return (
    <div>
      {/*<FormControl sx={{ m: 0, minWidth: 80, minHeight: 30 }}>*/}
      <FormControl>
        <Select
          defaultValue={date}
          onChange={handleChange}
          // displayEmpty
          // inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={"dayGridMonth"}>{t("Month")}</MenuItem>
          <MenuItem value={"timeGridWeek"}>{t("Week")}</MenuItem>
          <MenuItem value={"timeGridDay"}>{t("Day")}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLabel;
