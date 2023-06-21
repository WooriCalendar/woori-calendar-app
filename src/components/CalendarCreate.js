import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {BlockPicker} from 'react-color';
import {call} from "../service/ApiService";
import axios from "axios";

const CalendarCreate = () => {
    const nameRef = useRef('');
    const commentRef = useRef('');
    const [timeZones, setTimeZones] = useState([]);
    const timeZoneRef = useRef('');
    const colorRef = useRef('');
    const [calendar, setCalendar] = useState({name : '', comment : '', timeZone : '', color : ''})

    // https://worldtimeapi.org/api/timezone/

    useEffect(() => {
        axios.get('https://worldtimeapi.org/api/timezone/')
            .then((res) => {
                // console.log(res.data)
                setTimeZones(res.data)
            })
    }, []);

    const onNameChange = (e) => {
        nameRef.current = e.target.value;
        setCalendar({...calendar, name : nameRef.current})
    }

    const onCommentChange = (e) => {
        commentRef.current = e.target.value
        setCalendar({...calendar, comment: commentRef.current})
    }

    const onTimeZoneChange = async (e) => {
        await axios.get('https://worldtimeapi.org/api/timezone/' + e.target.value)
            .then((response) => {
                timeZoneRef.current = e.target.value + ' (utc ' + response.data.utc_offset + ')'
            })
        setCalendar({...calendar, timeZone: timeZoneRef.current})
    }

    const onColorChange = (e) => {
        colorRef.current = e.hex
        document.querySelector(".color .notranslate").innerHTML = colorRef.current
        // document.querySelector(".color .notranslate").parentElement.parentElement.querySelector("div:first-child").innerText = color
        // document.querySelector(".color .notranslate").parentElement.parentElement.querySelector("div:first-child").innerText = color
        // document.querySelector(".color .notranslate").parent.querySelector("fieldset legend").className = "css-14lo706"

        setCalendar({...calendar, color: colorRef.current})
    }

    const addCalendar = () => {
        console.log(calendar)

        call("/calendar", "POST", calendar)
            .then((response) => {
                console.log(response.data)
            })

        window.location.pathname = "/"
    }

    return (
        <Grid container className={"main"} style={{ width : 400, margin: "0 auto", justifyContent : "center"}}>
            <Grid item>
                <h2>캘린더 생성</h2>
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <TextField 
                    label={"이름"}
                    onChange={onNameChange}
                />
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <TextField 
                    label={"설명"}
                    onChange={onCommentChange}
                />
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <TextField
                    select
                    style={{ width : 400}}
                    label={"timeZone"}
                    onChange={onTimeZoneChange}
                >
                    {
                        timeZones.map((timeZone) => (
                            <MenuItem value={timeZone}>{timeZone}</MenuItem>
                        ))
                    }
                </TextField>
            </Grid>
            <Grid container style={{marginTop: 20}}>
                <TextField
                    select
                    style={{ width : 400}}
                    label={"color"}
                    className={"color"}
                >
                    <BlockPicker
                        width={400}
                        colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']}
                        onChange={onColorChange}
                        color={colorRef.current}
                    />
                </TextField>
            </Grid>
            <Grid container style={{ textAlign: "right", margin: "20px" }}>
                <Button variant="contained" onClick={addCalendar}>완료</Button>
            </Grid>
        </Grid>
    );
};

export default CalendarCreate;
