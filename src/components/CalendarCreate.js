import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { BlockPicker } from "react-color";
import { call, fetchMemberData } from "../service/ApiService";
import axios from "axios";
import { useTranslation } from "react-i18next";

const CalendarCreate = () => {
  const nameRef = useRef("");
  const commentRef = useRef("");
  const [timeZones, setTimeZones] = useState([]);
  const timeZoneRef = useRef("");
  const colorRef = useRef("");
  const [calendar, setCalendar] = useState({
    name: "",
    comment: "",
    timeZone: "",
    color: "",
  });
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

  // https://worldtimeapi.org/api/timezone/

  useEffect(() => {
    axios.get("https://worldtimeapi.org/api/timezone/").then((res) => {
      // console.log(res.data)
      setTimeZones(res.data);
    });
  }, []);

  const onNameChange = (e) => {
    nameRef.current = e.target.value;
    setCalendar({ ...calendar, name: nameRef.current });
  };

  const onCommentChange = (e) => {
    commentRef.current = e.target.value;
    setCalendar({ ...calendar, comment: commentRef.current });
  };

  const onTimeZoneChange = async (e) => {
    await axios
      .get("https://worldtimeapi.org/api/timezone/" + e.target.value)
      .then((response) => {
        timeZoneRef.current =
          e.target.value + " (utc " + response.data.utc_offset + ")";
      });
    setCalendar({ ...calendar, timeZone: timeZoneRef.current });
  };

  const onColorChange = (e) => {
    colorRef.current = e.hex;
    document.querySelector(".color .notranslate").innerHTML = colorRef.current;
    // document.querySelector(".color .notranslate").parentElement.parentElement.querySelector("div:first-child").innerText = color
    // document.querySelector(".color .notranslate").parentElement.parentElement.querySelector("div:first-child").innerText = color
    // document.querySelector(".color .notranslate").parent.querySelector("fieldset legend").className = "css-14lo706"

    setCalendar({ ...calendar, color: colorRef.current });
  };

  const addCalendar = () => {
    console.log(calendar);

    call("/calendar", "POST", calendar).then((response) => {
      console.log(response.data);
    });

    window.location.pathname = "/";
  };

  return (
    <Grid
      container
      className={"main"}
      style={{ width: 400, margin: "0 auto", justifyContent: "center" }}
    >
      <Grid item>
        <h2>{t("Create new calendar")}</h2>
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <TextField label={t("Name")} onChange={onNameChange} />
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <TextField label={t("Comment")} onChange={onCommentChange} />
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <TextField
          select
          style={{ width: 400 }}
          label={t("timeZone")}
          onChange={onTimeZoneChange}
        >
          {timeZones.map((timeZone) => (
            <MenuItem value={timeZone}>{timeZone}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <TextField
          select
          style={{ width: 400 }}
          label={t("Color")}
          className={"color"}
        >
          <BlockPicker
            width={400}
            colors={[
              "#FF6900",
              "#FCB900",
              "#7BDCB5",
              "#00D084",
              "#8ED1FC",
              "#0693E3",
              "#ABB8C3",
              "#EB144C",
              "#F78DA7",
              "#9900EF",
            ]}
            onChange={onColorChange}
            color={colorRef.current}
          />
        </TextField>
      </Grid>
      <Grid container style={{ textAlign: "right", margin: "20px" }}>
        <Button variant="contained" onClick={addCalendar}>
          {t("Complete")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CalendarCreate;
