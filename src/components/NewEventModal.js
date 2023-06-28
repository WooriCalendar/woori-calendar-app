import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Button, Grid, MenuItem, Switch, TextField } from "@mui/material";
import { ko } from "date-fns/locale";
import moment from "moment";
import { call, fetchMemberData } from "../service/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GoogleMaps from "./GooglePlace";
import { useTranslation } from "react-i18next";

const NewEventModal = (props) => {
  const { open, close, calendar, scheduleDTO } = props;
  // console.log("asdasdasdasasdd99", scheduleNo);
  // alert(scheduleNo.scNo);
  // console.log("scheduleDTOscheduleDTO", scheduleDTO);

  const fullDayRef = useRef(false);
  const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const untilRef = useRef(
    moment(new Date().setMonth(new Date().getMonth() + 1)).format("YYYY-MM-DD")
  );
  const repeatRef = useRef("");
  const [repeatToggle, setRepeatToggle] = useState(false);
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();
  const [calendars, setCalendars] = useState(false);
  const [schedule, setSchedule] = useState({
    scNo: "",
    title: "",
    comment: "",
    start: dateRef.current,
    end: dateRef.current,
    calNo: "",
    place: "",
    rrule: {},
    status: "",
  });

  // console.log("뉴이벤트모달테스트", scheduleDTO);
  useEffect(() => {
    setSchedule(scheduleDTO);
  }, [scheduleDTO]);
  // console.log("000000000000000000000088888888", schedule);

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      // console.log("뉴이벤트모달", response.data[0]);
      setCalendars(response.data);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

  const [istitleCheck, setIstitleCheck] = useState(false);
  const titleRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?\s]{2,20}$/;
  const onTitleChange = (e) => {
    setSchedule({
      ...schedule,
      title: e.target.value,
    });
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

  const onSwitchChange = (e) => {
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
    setSchedule({
      ...schedule,
      start: dateRef.current,
    });
  };

  const onEndDateChange = (e) => {
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD");
    setSchedule({
      ...schedule,
      end: dateRef.current,
    });
  };

  const onUntilChange = (e) => {
    untilRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD");
    setSchedule({
      ...schedule,
      rrule: { until: untilRef.current, freq: repeatRef.current },
    });
  };

  const onStartTimeChange = (e) => {
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    setSchedule({ ...schedule, start: dateRef.current });
  };

  const onEndTimeChange = (e) => {
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    setSchedule({ ...schedule, end: dateRef.current });
  };

  const onRepeatChange = (e) => {
    setRepeatToggle(!repeatToggle);
    // console.log(schedule);
    // alert(e.target.checked);
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
        setSchedule({
          ...schedule,
          place: e.description,
        });
      }, 200);
    }
  };

  const onCommentChange = (e) => {
    setSchedule({
      ...schedule,
      comment: e.target.value,
    });
  };

  const onUpdate = () => {
    // console.log(schedule);
    if (istitleCheck) {
      const updatedItem = {
        ...schedule,
        rrule: { ...schedule.rrule },
      };
      // console.log("1번", updatedItem);
      // if (istitleCheck) {
      console.log("2번", updatedItem);
      call("/schedule", "PUT", updatedItem).then((response) => {
        // console.log("3번", updatedItem);
        // console.log("response.dataresponse.dataresponse.data", response.data);
      });
    }
    window.location.pathname = "/";
    // }
  };
  // console.log("asdasdas66+++++", schedule.scNo);

  // console.log("ㄹ라라라랄라라라", schedule);
  return (
    <div item xs={12} className={open ? "openModal modal" : "modal"}>
      {open ? (
        <Grid
          container
          style={{
            width: 400,
            margin: "0 auto",
            justifyContent: "center",
            background: "#fff", // 배경색을 흰색으로 설정
            opacity: 1, // 투명도를 1로 설
            padding: "20px", // 패딩을 추가하여 콘텐츠가 잘 보이도록 설정
            borderRadius: "8px", // 모달 창에 둥근 테두리를 추가
          }}
        >
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <button
              className="close"
              onClick={close}
              style={{
                background: "#fff",
                //   textAlign: "right",
                marginLeft: "80px",
              }}
            >
              <CloseIcon />
            </button>
          </Grid>
          <Grid item xs={12}>
            <h2>{t("Modifying the Schedule")}</h2>
          </Grid>
          <Grid>
            <TextField
              id="title-modal"
              container
              label={t("Title")}
              // defaultValue={schedule.title}
              value={schedule.title || ""}
              style={{ width: "350px", paddingBottom: "10px" }}
              onChange={onTitleChange}
            />
            <div id="titleCheck" style={{ color: "red" }}></div>
          </Grid>
          <Grid>
            <Grid container style={{ width: "350px" }}>
              <FontAwesomeIcon icon={faClock} style={{ color: "#3b3b3b" }} />
              <span>{t("All-day")}</span>
              <Switch checked={fullDayRef.current} onChange={onSwitchChange} />
            </Grid>
            <Grid container>
              <Grid item style={{ width: "350px" }}>
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
                  (calendar) => calendar.calNo != 90 && calendar.calNo != 98
                )
                .map((calendar) => (
                  <MenuItem value={calendar.calNo}>{calendar.name}</MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <GoogleMaps onPlaceChange={onPlaceChange} />
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <TextField
              style={{ width: 400 }}
              label={t("Comment")}
              value={schedule.comment}
              onChange={onCommentChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "right", margin: "20px" }}>
            <Button variant="contained" onClick={onUpdate}>
              {t("Complete")}
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default NewEventModal;
