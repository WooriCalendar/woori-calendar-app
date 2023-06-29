import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Button, Grid, MenuItem, Switch, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { ko } from "date-fns/locale";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { call, fetchMemberData } from "../service/ApiService";
import moment from "moment";
import GoogleMaps from "./GooglePlace";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ScheduleCreate = () => {
  const fullDayRef = useRef(false);
  const [repeatToggle, setRepeatToggle] = useState(false);
  const [calendars, setCalendars] = useState([]);
  const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const untilRef = useRef(
    moment(new Date().setMonth(new Date().getMonth() + 1)).format("YYYY-MM-DD")
  );
  const repeatRef = useRef("");
  const [schedule, setSchedule] = useState({
    title: "",
    comment: "",
    start: dateRef.current,
    end: dateRef.current,
    calNo: "",
    place: "",
    rrule: {},
    status: "",
  });
  const [istitleCheck, setIstitleCheck] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

    console.log(calendars)

  useEffect(() => {
    call("/calendar/share", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      setCalendars(response.data);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);
  const titleRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?\s]{2,20}$/;
  const onTitleChange = (e) => {
    setSchedule({ ...schedule, title: e.target.value });
    titleRegEx.test(e.target.value);
    if (!titleRegEx.test(e.target.value)) {
      document.getElementById("titleCheck").innerText = t(
        t("Please enter at least 2 characters and no more than 20 characters")
      );
    } else {
      document.getElementById("titleCheck").innerText = t("it's possible");
      setIstitleCheck(true);
    }
  };

  const onSwitchChange = () => {
    fullDayRef.current = !fullDayRef.current;
    dateRef.current = moment(new Date()).format("YYYY-MM-DD");
    setSchedule({
      ...schedule,
      status: fullDayRef.current,
      start: dateRef.current,
      end: dateRef.current,
    });
  };

  const onStartDateChange = (e) => {
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD");
    setSchedule({ ...schedule, start: dateRef.current });
  };

  const onEndDateChange = (e) => {
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD");
    setSchedule({ ...schedule, end: dateRef.current });
  };

  const onUntilChange = (e) => {
    untilRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD");
    setSchedule({
      ...schedule,
      rrule: { until: untilRef.current, freq: repeatRef.current },
    });
  };

  const onStartTimeChange = (e) => {
    // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    // setDate(dateRef.current)
    setSchedule({ ...schedule, start: dateRef.current });
  };

  const onEndTimeChange = (e) => {
    // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    // setDate(dateRef.current)
    setSchedule({ ...schedule, end: dateRef.current });
  };

  const onRepeatChange = () => {
    setRepeatToggle(!repeatToggle);
    console.log(schedule);
  };

  const onFreqChange = (e) => {
    repeatRef.current = e.target.value;
    setSchedule({
      ...schedule,
      rrule: { until: untilRef.current, freq: repeatRef.current },
    });
  };

  const onCalendarChange = (e) => {
    setSchedule({ ...schedule, calNo: e.target.value });
  };

  const onPlaceChange = (e) => {
    console.log("place");
    if (e !== null) {
      setTimeout(() => {
        console.log(e.description);
        setSchedule({ ...schedule, place: e.description });
      }, 200);
    }
  };

  const onCommentChange = (e) => {
    setSchedule({ ...schedule, comment: e.target.value });
  };

  const addSchedule = () => {
    console.log(schedule);

    if (istitleCheck) {
      call("/schedule", "POST", schedule).then((response) => {
        console.log(response.data);
      });

      window.location.pathname = "/";
    }
  };

  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(-1);
  };

  console.log(schedule);

  // 웹소켓
  // 일정 생성 알림은 아니고 생성 시 같은 캘린더를 구독하고 있는 사람 리렌더링
  // 일정 생성 시 지정된 캘린더 번호를 구독하고 있는 모든 회원에게 메세지

  return (
    <Grid
      container
      className={"main"}
      style={{ width: 400, margin: "0 auto", justifyContent: "center" }}
    >
      <Grid item style={{ textAlign: "center" }}>
        <h2>{t("Create schedule")}</h2>
      </Grid>
      <TextField
        style={{ width: 400 }}
        label={t("Title")}
        onChange={onTitleChange}
      />
      <div id="titleCheck" style={{ color: "red" }}></div>
      <Grid container style={{ marginTop: 20 }}>
        <Grid container>
          <FontAwesomeIcon icon={faClock} style={{ color: "#3b3b3b" }} />
          <span>{t("All-day")}</span>
          <Switch checked={fullDayRef.current} onChange={onSwitchChange} />
        </Grid>
        <Grid container>
          <Grid item>
            <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
              {fullDayRef.current ? (
                <>
                  <DatePicker
                    defaultValue={dayjs(new Date())}
                    format={"YYYY-MM-DD"}
                    onChange={onStartDateChange}
                  />
                  <DatePicker
                    defaultValue={dayjs(new Date()).add(1, "h")}
                    format={"YYYY-MM-DD"}
                    onChange={onEndDateChange}
                  />
                </>
              ) : (
                <>
                  <DesktopDateTimePicker
                    defaultValue={dayjs(new Date())}
                    format={"YYYY-MM-DD HH:mm:ss"}
                    onChange={onStartTimeChange}
                  />
                  <DesktopDateTimePicker
                    defaultValue={dayjs(new Date())}
                    format={"YYYY-MM-DD HH:mm:ss"}
                    onChange={onEndTimeChange}
                  />
                </>
              )}
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 20 }}>
          <span>{t("Repeat")}</span>
          <Switch checked={repeatToggle} onChange={onRepeatChange} />
        </Grid>
        {repeatToggle ? (
          <Grid container>
            <TextField
              select
              style={{ width: 400 }}
              label={t("Repeat")}
              onChange={onFreqChange}
            >
              <MenuItem value={"daily"}>{t("Daily")}</MenuItem>
              <MenuItem value={"weekly"}>{t("Weekly")}</MenuItem>
              <MenuItem value={"monthly"}>{t("Monthly")}</MenuItem>
              <MenuItem value={"yearly"}>{t("Yearly")}</MenuItem>
            </TextField>
            <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
              <Grid container style={{ marginTop: 20 }}>
                <DatePicker
                  defaultValue={dayjs(
                    new Date().setMonth(new Date().getMonth() + 1)
                  )}
                  format={"YYYY-MM-DD"}
                  onChange={onUntilChange}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        ) : (
          ""
        )}
        <Grid container style={{ marginTop: 20 }}>
          <TextField
            select
            style={{ width: 400 }}
            label={t("Calendar")}
            onChange={onCalendarChange}
          >
            {calendars
              .filter(
                (calendar) => calendar.calNo != 90 && calendar.calNo != 98 && calendar.grade !== 0
              )
              .map((calendar) => (
                <MenuItem value={calendar.calNo}>{calendar.calName}</MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        {/*<TextField*/}
        {/*    style={{ width : 400}}*/}
        {/*    label={"위치 추가"}*/}
        {/*    onChange={onPlaceChange}*/}
        {/*/>*/}
        <GoogleMaps onPlaceChange={onPlaceChange} />
      </Grid>
      <Grid container style={{ marginTop: 20 }}>
        <TextField
          style={{ width: 400 }}
          label={t("Comment")}
          onChange={onCommentChange}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Button
          item
          xs={6}
          variant="outline"
          onClick={onClickBtn}
          style={{ textAlign: "left" }}
        >
          {t("Back")}
        </Button>
        <Button
          item
          xs={6}
          style={{ textAlign: "right", marginLeft: "246px" }}
          variant="contained"
          onClick={addSchedule}
        >
          {t("Complete")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ScheduleCreate;
