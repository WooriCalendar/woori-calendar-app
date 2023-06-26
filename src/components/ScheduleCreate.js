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

const ScheduleCreate = () => {

    const fullDayRef = useRef(false);
    const [repeatToggle, setRepeatToggle] = useState(false);
    const [calendars, setCalendars] = useState([]);
    const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    const untilRef = useRef(moment(new Date()).format("YYYY-MM-DD"));
    const repeatRef = useRef('');
    const [schedule, setSchedule] = useState({title : '', comment : '', start : dateRef.current, end : dateRef.current, calNo : '', place : '', rrule : {}, status : ''})
    const [istitleCheck, setIstitleCheck]  = useState(false);
    const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

    useEffect(() => {
        call("/calendar", "GET", null).then((response) => {
            console.log("캘린더 데이터");
            setCalendars(response.data);
        });
    }, []);
    const titleRegEx = /[^?a-zA-Z0-9/]{2,20}$/
    const onTitleChange = (e) => {
        setSchedule({...schedule, title : e.target.value});
        titleRegEx.test(e.target.value);
        if(!titleRegEx.test(e.target.value)) {
            document.getElementById('titleCheck').innerText = "Please enter at least 2 characters and no more than 20 characters";

        }else{
            document.getElementById('titleCheck').innerText = "it's possible";
            setIstitleCheck(true);
        }
    }

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

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      setCalendars(response.data);
    });
  }, []);

  const onTitleChange = (e) => {
    setSchedule({ ...schedule, title: e.target.value });
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

  const onTimeChange = (e) => {
    // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    // setDate(dateRef.current)
    setSchedule({ ...schedule, start: dateRef.current, end: dateRef.current });
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


        if(istitleCheck) {
            call("/schedule", "POST", schedule)
                .then((response) => {
                    console.log(response.data)
                })

            window.location.pathname = "/"
        }
    }
  };

  const onCommentChange = (e) => {
    setSchedule({ ...schedule, comment: e.target.value });
  };

  const addSchedule = () => {
    console.log(schedule);

    call("/schedule", "POST", schedule).then((response) => {
      console.log(response.data);
    });

    window.location.pathname = "/";
  };

  console.log(schedule);

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
                    defaultValue={dayjs(new Date())}
                    format={"YYYY-MM-DD"}
                    onChange={onEndDateChange}
                  />
                </>
              ) : (
                <DesktopDateTimePicker
                  defaultValue={dayjs(new Date())}
                  format={"YYYY-MM-DD HH:mm:ss"}
                  onChange={onTimeChange}
                />
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

                style={{ width : 400 }}
                label={"제목"}
                onChange={onTitleChange}
            />
            <div id="titleCheck" style={{color:"red"}}></div>
            <Grid container style={{ marginTop : 20 }}>
                <Grid container>
                    <FontAwesomeIcon icon={faClock} style={{color: "#3b3b3b",}} />
                    <span>종일</span>
                    <Switch checked={fullDayRef.current} onChange={onSwitchChange} />
                </Grid>
                <Grid container>
                    <Grid item>
                        <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
                            {
                                fullDayRef.current ?
                                    (
                                        <>
                                            <DatePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD"} onChange={onStartDateChange} />
                                            <DatePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD"} onChange={onEndDateChange} />
                                        </>
                                    )
                                        :
                                    (<DesktopDateTimePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD HH:mm:ss"} onChange={onTimeChange} />)
                            }
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop : 20 }}>
                    <span>반복</span>
                    <Switch checked={repeatToggle} onChange={onRepeatChange} />
                </Grid>
                {
                    repeatToggle ?
                        (
                            <Grid container>
                                <TextField
                                    select
                                    style={{ width : 400}}
                                    label={t("Repeat")}
                                    onChange={onFreqChange}
                                >
                                   <MenuItem value={"daily"}>{t("Daily")}</MenuItem>
              <MenuItem value={"weekly"}>{t("Weekly")}</MenuItem>
              <MenuItem value={"monthly"}>{t("Monthly")}</MenuItem>
              <MenuItem value={"yearly"}>{t("Yearly")}</MenuItem>
                                </TextField>
                                <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
                                    <Grid container style={{ marginTop : 20 }}>
                                        <DatePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD"} onChange={onUntilChange}/>
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                        ) : ''
                }
                <Grid container style={{ marginTop : 20 }}>
                    <TextField
                        select
                        style={{ width : 400}}
                        label={"캘린더"}
                        onChange={onCalendarChange}
                    >
                        {
                            calendars.map((calendar) => (
                                <MenuItem value={calendar.calNo}>{calendar.name}</MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop : 20 }}>
                {/*<TextField*/}
                {/*    style={{ width : 400}}*/}
                {/*    label={"위치 추가"}*/}
                {/*    onChange={onPlaceChange}*/}
                {/*/>*/}
                <GoogleMaps onPlaceChange={onPlaceChange}/>
            </Grid>
            <Grid container style={{ marginTop : 20 }}>
                <TextField
                    style={{ width : 400 }}
                    label={"설명 추가"}
                    onChange={onCommentChange}
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
            {calendars.map((calendar) => (
              <MenuItem value={calendar.calNo}>{calendar.name}</MenuItem>
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
      <Grid container style={{ textAlign: "right", margin: "20px" }}>
        <Button variant="contained" onClick={addSchedule}>
          {t("Complete")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ScheduleCreate;
