import React, {useEffect, useRef, useState} from "react";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import {call} from "../service/ApiService";
import FullCalendars from "./FullCalendars";

const Category = (props) => {
    const [calendars, setCalendars] = useState([]);
    const calendarRef = useRef({});

    const categoryChange = props.onCategoryChange;

    /**
     * @Author K-설하
     * 회원 이메일을 통하여 캘린더 가져오기
     * */
    // useEffect(() => {
    //   call("/calendar", "GET", null).then((response) => {
    //     console.log("캘린더 데이터");
    //     setCalendar(response.data);
    //   });
    // }, []);

    useEffect(() => {
        call("/calendar/share", "GET", null).then((response) => {
            console.log("캘린더 데이터");
            setCalendars(response.data);
        });
    }, []);

    const onCategoryChange = async (e) => {
        await call("/share/" + e.target.value, "GET", null)
            .then((response) => {
                calendarRef.current = response.data[0]
                console.log(response.data[0])
            })

        calendarRef.current.checked = !calendarRef.current.checked

        await call("/share", "PUT", calendarRef.current)
            .then((response) => {
                console.log(response.data)
            })

        categoryChange()
    }

    return (
        <>
            {
                calendars.map((item) => (
                    <Grid container>
                        <div key={item.calNo}>
                            <FormControlLabel
                                control={<Checkbox name={item.calName} value={item.shareNo} defaultChecked={item.checked} onChange={onCategoryChange}/>}
                                label={item.calName}
                            />
                        </div>
                    </Grid>
                ))
            }
        </>
    );
};

export default Category;
