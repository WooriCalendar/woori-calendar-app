import React, {useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import {Button, Grid, MenuItem, Switch, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { ko } from "date-fns/locale";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {call} from "../service/ApiService";
import moment from 'moment';

const ScheduleCreate = () => {
    const [switchToggle, setSwitchToggle] = useState(false);
    const [calendars, setCalendars] = useState([]);
    const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    const [schedule, setSchedule] = useState({title : '', comment : '', start : dateRef.current, end : dateRef.current, calNo : '', place : '', rrule : '', status : ''})

    useEffect(() => {
        call("/calendar", "GET", null).then((response) => {
            console.log("캘린더 데이터");
            setCalendars(response.data);
        });
    }, []);

    const onTitleChange = (e) => {
        setSchedule({...schedule, title : e.target.value})
    }

    const onSwitchChange = () => {
        setSwitchToggle(!switchToggle);
        setSchedule({...schedule, status: switchToggle})
    }

    const onDateChange = (e) => {
        // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD"))
        dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD")
        // setDate(dateRef.current)
        setSchedule({...schedule, start: dateRef.current, end : dateRef.current})
    }

    const onTimeChange = (e) => {
        // setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
        dateRef.current = moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss")
        // setDate(dateRef.current)
        setSchedule({...schedule, start: dateRef.current, end : dateRef.current})
    }

    const onFreqChange = (e) => {
        setSchedule({...schedule, rrule : {freq : e.target.value}})
    }

    const onCalendarChange = (e) => {
        setSchedule({...schedule, calNo: e.target.value})
    }

    const onPlaceChange = (e) => {
        setSchedule({...schedule, place : e.target.value})
    }

    const onCommentChange = (e) => {
        setSchedule({...schedule, comment: e.target.value})
    }

    const addSchedule = () => {
        console.log(schedule)

        call("/schedule",  "POST", schedule)
            .then((response) => {
                console.log(response.data)
            })

        window.location.pathname = "/"
    }

    console.log(schedule)

    return (
        <Grid container className={"main"} style={{ width : 400, margin: "0 auto", justifyContent : "center"}}>
            <Grid item style={{ textAlign: "center" }}>
                <h2>일정 생성</h2>
            </Grid>
            <TextField
                style={{ width : 400 }}
                label={"제목"}
                onChange={onTitleChange}
            />
            <Grid container style={{ marginTop : 20 }}>
                <Grid container>
                    <FontAwesomeIcon icon={faClock} style={{color: "#3b3b3b",}} />
                    <span>종일</span>
                    <Switch checked={switchToggle} onChange={onSwitchChange} />
                </Grid>
                <Grid container>
                    <Grid item>
                        <LocalizationProvider locale={ko} dateAdapter={AdapterDayjs}>
                            {
                                switchToggle ?
                                    (<DatePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD"} onChange={onDateChange} /> )
                                        :
                                    (<DesktopDateTimePicker defaultValue={dayjs(new Date())} format={"YYYY-MM-DD HH:mm:ss"} onChange={onTimeChange} />)
                            }
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop : 20 }}>
                    <TextField
                        select
                        style={{ width : 400}}
                        label={"반복"}
                        onChange={onFreqChange}
                    >
                        <MenuItem value={null} selected={true}>반복 안함</MenuItem>
                        <MenuItem value={"daily"}>매일</MenuItem>
                        <MenuItem value={"weekly"}>매주</MenuItem>
                        <MenuItem value={"monthly"}>매월</MenuItem>
                        <MenuItem value={"yearly"}>매년</MenuItem>
                    </TextField>
                </Grid>
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
                <TextField
                    style={{ width : 400}}
                    label={"위치 추가"}
                    onChange={onPlaceChange}
                />
            </Grid>
            <Grid container style={{ marginTop : 20 }}>
                <TextField
                    style={{ width : 400 }}
                    label={"설명 추가"}
                    onChange={onCommentChange}
                />
            </Grid>
            <Grid container style={{ textAlign: "right", margin: "20px" }}>
                <Button variant="contained" onClick={addSchedule}>완료</Button>
            </Grid>
        </Grid>
    );
};

export default ScheduleCreate;
