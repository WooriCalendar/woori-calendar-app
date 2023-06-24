import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Button, Grid, MenuItem, Switch, TextField } from "@mui/material";
import { ko } from "date-fns/locale";
import moment from "moment";
import { call } from "../service/ApiService";
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
const NewEventModal = (props) => {
  const { open, close, calendar, scheduleDTO } = props;
  // console.log("asdasdasdasasdd99", scheduleNo);
  // alert(scheduleNo.scNo);
  console.log("scheduleDTOscheduleDTO", scheduleDTO);

  const fullDayRef = useRef(false);
  const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const untilRef = useRef(moment(new Date()).format("YYYY-MM-DD"));
  const repeatRef = useRef("");
  const [repeatToggle, setRepeatToggle] = useState(false);
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
  useEffect(() => {
    setSchedule(scheduleDTO);
  }, [scheduleDTO]);
  console.log("000000000000000000000088888888", schedule);
  const [calendars, setCalendars] = useState(false);
  // const [title, setTitle] = useState("");
  // const [comment, setComment] = useState("");

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      // console.log("뉴이벤트모달", response.data[0]);
      setCalendars(response.data);
      // setSchedule(response);
    });
  }, []);

  // useState(() => {
  //   call("/schedule/", "GET", null).then((response) => {
  //     console.log("뉴이벤트모달", response.data[0]);
  //     // setSchedule(response.data[0]);
  //     setSchedule(response.data);
  //     // setSchedule(response);
  //   });
  // }, []);

  const onTitleChange = (e) => {
    setSchedule({
      ...schedule,
      title: e.target.value,
    });
    console.log("setSchedule 타이틀", schedule.title);
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

  const onTimeChange = (e) => {
    // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
    dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss");
    // setDate(dateRef.current)
    setSchedule({
      ...schedule,
      start: dateRef.current,
      end: dateRef.current,
    });
  };

  const onRepeatChange = (e) => {
    setRepeatToggle(!repeatToggle);
    console.log(schedule);
    alert(e.target.checked);
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
    console.log(schedule);
    const updatedItem = {
      ...schedule,
      rrule: { ...schedule.rrule },
      scNo: 828,
      // title: document.getElementById("title-modal").value,
    };
    console.log("asdasdas66677667", updatedItem);
    console.log("asdasdas66+++++", schedule.scNo);
    // window.location.pathname = "/";
    call("/schedule", "PUT", updatedItem).then((response) => {
      console.log("response.dataresponse.dataresponse.data", response.data);
      // alert("먼데 된거야");
    });
  };

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
            <h2>Modifying the Schedule</h2>
          </Grid>
          <Grid>
            <TextField
              id="title-modal"
              container
              label={"title"}
              // defaultValue={schedule.title}
              value={schedule.title || ""}
              style={{ width: "350px", paddingBottom: "10px" }}
              onChange={onTitleChange}
            />
          </Grid>
          <Grid>
            <Grid container style={{ width: "350px" }}>
              <FontAwesomeIcon icon={faClock} style={{ color: "#3b3b3b" }} />
              <span>All day</span>
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
          </Grid>
          <Grid container style={{ marginTop: 10 }}>
            <span>repeat</span>
            <Switch checked={repeatToggle} onChange={onRepeatChange} />
          </Grid>
          {repeatToggle ? (
            <Grid container>
              <TextField
                select
                style={{ width: 400 }}
                label={"repeat"}
                onChange={onFreqChange}
              >
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
                <MenuItem value={"yearly"}>Every year</MenuItem>
              </TextField>
              <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
                <Grid container style={{ marginTop: 20 }}>
                  <DatePicker
                    defaultValue={dayjs(new Date())}
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
              label={"Calendar"}
              onChange={onCalendarChange}
            >
              {calendars.map((calendars) => (
                <MenuItem value={calendars.calNo}>{calendars.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <GoogleMaps onPlaceChange={onPlaceChange} />
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <TextField
              style={{ width: 400 }}
              label={"Comment"}
              value={schedule.comment}
              onChange={onCommentChange}
            />
          </Grid>

          <Grid container style={{ textAlign: "right", margin: "20px" }}>
            <Button variant="contained" onClick={onUpdate}>
              Completion
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default NewEventModal;
