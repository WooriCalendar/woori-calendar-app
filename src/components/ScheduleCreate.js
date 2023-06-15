import React, {useState} from 'react';
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
    const [schedule, setSchedule] = useState({title : '', comment : '', start : '', end : '', place : '', rrule : '', status : ''})
    const [date, setDate] = useState(new Date());

    const onTitleChange = (e) => {
        setSchedule({...schedule, title : e.target.value})
        console.log(schedule)
    }

    const onSwitchChange = () => {
        setSwitchToggle(!switchToggle);
        setSchedule({...schedule, status: switchToggle})
        console.log(switchToggle)
    }

    const onDateChange = (e) => {
        setDate(moment(dayjs(e).$d).format("YYYY-MM-DD"))
        setSchedule({...schedule, start: date, end : date})
        console.log(moment(dayjs(e).$d).format("YYYY-MM-DD"))
    }

    const onTimeChange = (e) => {
        setDate(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
        setSchedule({...schedule, start: date, end : date})
        console.log(moment(dayjs(e).$d).format("YYYY-MM-DD HH:mm:ss"))
    }

    const onFreqChange = (e) => {
        setSchedule({...schedule, rrule : {freq : e.target.value}})
        console.log(schedule)
    }

    const onPlaceChange = (e) => {
        setSchedule({...schedule, place : e.target.value})
        console.log(schedule)
    }

    const onCommentChange = (e) => {
        setSchedule({...schedule, comment: e.target.value})
        console.log(schedule)
    }

    const addSchedule = () => {
        call("/schedule",  "POST", schedule)
            .then((response) => {
                console.log(response.data)
            })

        window.location.pathname = "/"
    }

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
                                    (<DatePicker defaultValue={dayjs(date)} format={"YYYY-MM-DD"} onChange={onDateChange} /> )
                                        :
                                    (<DesktopDateTimePicker defaultValue={dayjs(date)} format={"YYYY-MM-DD HH:mm:ss"} onChange={onTimeChange} />)
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
