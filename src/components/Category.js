import React, {useEffect, useState} from 'react';
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import {call} from "../service/ApiService";
const Category = () => {
    const[calendar, setCalendar] = useState([]);
    /**
     * @Author K-설하
     * 회원 이메일을 통하여 캘린더 가져오기
     * */
    useEffect(() => {
            call("/calendar", "GET", null)
                .then((response) => {
                    console.log("캘린더 데이터")
                    setCalendar(response.data)
                });
        }, []
    )
    return (
        <div>
            {calendar.map((item) => (
                <div key={item.calNo}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name={item.name}
                            checked={item.comment}
                            />
                    }
                        label={item.name}
                        />
                </div>
            ))}
        </div>
    );
};

export default Category;
