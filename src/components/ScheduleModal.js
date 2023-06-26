import React, {useEffect, useRef, useState} from 'react';
import "../../src/ShareModal.css";
import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import axios from "axios";

const ScheduleModal = (props) => {
    const {open, close, date, events} = props;
    // const date = props.date;
    const url = useRef('')
    const [lunar, setLunar] = useState({})

    if (date) {
        url.current = "http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getLunCalInfo?solYear=" + date.substring(0, 4) + "&solMonth=" + date.substring(5, 7) + "&solDay=" + date.substring(8, 10) + "&ServiceKey=IG%2Btj8HMVdwRhr5YlwCmcI3zCoxQ4lxQGB2qQY%2FFXso9%2BEXmMa47M3%2B9RIHuWpg75hkFF6%2Bd9zQ%2FGnh%2FpYRaVQ%3D%3D"
    }

    useEffect(() => {
        axios.get(url.current)
            .then((response) => {
                if (response.data.response) setLunar(response.data.response.body.items.item)
            })
    }, [date])

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {
                open ? (
                    <section>
                        <header>
                            <div style={{fontSize : 12, display : 'inline-block', float : "left", lineHeight : "23px", color : "gray"}}>음력 {lunar.lunMonth}.{lunar.lunDay}</div>
                            <span>{date}</span>
                            <button className="close" onClick={close}>
                                <CloseIcon />
                            </button>
                        </header>
                        <main>
                            <Grid style={{ marginBottom: "20px" }}>
                                {
                                    events.map((event) => (
                                        <p style={{textAlign : "left"}}>{event.title}</p>
                                    ))
                                }
                            </Grid>
                        </main>
                    </section>
                ) : null
            }
        </div>
    );
};

export default ScheduleModal;
