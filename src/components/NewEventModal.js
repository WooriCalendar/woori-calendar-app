import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Button, Grid, MenuItem, Switch, TextField } from "@mui/material";
import { ko, tr } from "date-fns/locale";
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
  const { open, close, scheduleDTO } = props;

  const fullDayRef = useRef(false);
  const startDateRef = useRef();
  const dateRef = useRef();
  const untilRef = useRef();
  // moment(new Date().setMonth(new Date().getMonth() + 1)).format("YYYY-MM-DD")
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
  let regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  // console.log("뉴이벤트모달테스트", scheduleDTO);
  useEffect(() => {
    setSchedule(scheduleDTO);
    if (regex.test(scheduleDTO.start)) {
      fullDayRef.current = true;
    } else {
      fullDayRef.current = false;
    }
    if (scheduleDTO.rrule=== null) {
      console.log("단순일정")
      setRepeatToggle(false);
      schedule.rrule=null;
    } else{
      console.log("반복일정")
      setRepeatToggle(true);
      // untilRef.current=schedule.rrule.until;
      // repeatRef.current=schedule.rrule.freq;
    }

  }, [scheduleDTO]);

  console.log("response.data:::::::::::::", scheduleDTO);
  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      // console.log("뉴이벤트모달", response.data[0]);
      setCalendars(response.data);

      i18n.changeLanguage(response.language);

      if (titleRegEx.test(response.data[0].name)) {
        setIstitleCheck(true);
      }
    });
    fetchMemberData();
  }, []);

  const [istitleCheck, setIstitleCheck] = useState(false);
  const titleRegEx =
      /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?][ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?\s]{0,18}[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?]$/;

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
  };

  const onFreqChange = (e) => {
    repeatRef.current = e.target.value;
    setSchedule({
      ...schedule,
      rrule: { until: untilRef.current, freq: repeatRef.current },
    });

  };

  const onCalendarChange = (e) => {
    const selectedCalendarNo = e.target.value;
    const selectedCalendar = calendars.find(
        (calendar) => calendar.calNo === selectedCalendarNo
    );
    setSchedule({
      ...schedule,
      calNo: selectedCalendar ? selectedCalendar.calNo : "",
    });
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
    console.log("반복상태를 나타냄" +repeatToggle);
    if (istitleCheck && repeatToggle) {
      if(untilRef.current == null){
        untilRef.current = scheduleDTO.rrule.until
      }
      if(repeatRef.current == null){
        repeatRef.current = scheduleDTO.rrule.freq;
      }

      const updatedItem = {
        ...schedule,
        rrule: { until :untilRef.current , freq : repeatRef.current },
      };
      // console.log("1번", schedule);
      // console.log("2번", updatedItem);
      call("/schedule", "PUT", updatedItem).then((response) => {
        console.log("3번", updatedItem);
        window.location.href = "/"
      });

    }else if(!(istitleCheck && repeatToggle)) {
      const updatedItem = {
        ...schedule,
        status: fullDayRef.current,
        // rrule: { dtstart : null, untilRef : null, freq : null },
        rrule : {}
      };
      // console.log("1번", schedule);
      // console.log("2번", updatedItem);
      call("/schedule", "PUT", updatedItem).then((response) => {
        console.log("4번", updatedItem);
        window.location.href = "/"
      });

    }

    // window.location.pathname = "/";
  };

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
                    defaultValue={schedule.title}
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
                                defaultValue={dayjs(schedule.start)}
                                format={"YYYY-MM-DD"}
                                onChange={onStartDateChange}
                            />
                            <DatePicker
                                defaultValue={dayjs(schedule.end)}
                                format={"YYYY-MM-DD"}
                                onChange={onEndDateChange}
                            />
                          </>
                      ) : (
                          <>
                            <DesktopDateTimePicker
                                defaultValue={dayjs(schedule.start)}
                                format={"YYYY-MM-DD HH:mm:ss"}
                                onChange={onStartTimeChange}
                            />
                            <DesktopDateTimePicker
                                defaultValue={dayjs(schedule.end)}
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
                        id="freq"
                        defaultValue={schedule.rrule.freq ? schedule.rrule.freq: null }
                    >
                      <MenuItem value={"daily"}>{t("Daily")}</MenuItem>
                      <MenuItem value={"weekly"}>{t("Weekly")}</MenuItem>
                      <MenuItem value={"monthly"}>{t("Monthly")}</MenuItem>
                      <MenuItem value={"yearly"}>{t("Yearly")}</MenuItem>
                    </TextField>
                    <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
                      <Grid container style={{ marginTop: 20 }}>
                        <DatePicker
                            // defaultValue={dayjs(schedule.rrule.until || "")}
                            defaultValue={dayjs(
                                new Date().setMonth(new Date().getMonth() + 1)
                            ) || ""}
                            // value={dayjs(new Date(untilRef.current)) || ""}
                            format={"YYYY-MM-DD"}
                            onChange={onUntilChange}
                            id="until"
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
                    // defaultValuevalue={calendar.name}

                    value={schedule.calNo}
                    onChange={onCalendarChange}
                >
                  {calendars
                      .filter(
                          (calendar) => calendar.calNo != 90 && calendar.calNo != 98
                      )
                      .map((calendar) => (
                          <MenuItem key={calendar.calNo} value={calendar.calNo}>
                            {calendar.name}
                          </MenuItem>
                      ))}
                </TextField>
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <GoogleMaps onPlaceChange={onPlaceChange} value={schedule.place} />
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