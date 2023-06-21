import React, {useEffect, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import moment from "moment";
import {call} from "../service/ApiService";
import axios from "axios";
import {Button} from "@mui/material";

const EventModal = (props) => {
    const {open, close, event, schedule, calendar} = props;

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {
                open ? (
                    <section>
                        <header>
                            <span>{schedule.title}</span>
                            <button className="close" onClick={close}>
                                <CloseIcon />
                            </button>
                        </header>
                        <main>
                            <Grid container style={{ marginBottom: "20px" }}>
                                {/*{moment(event.recurringDef.typeData.rruleSet.dtStart).format("yyyy-MM-DD")}*/}
                            </Grid>
                            <Grid container style={{ marginBottom: "20px" }}>
                                {schedule.comment}
                            </Grid>
                            <Grid container style={{ marginBottom: "20px" }}>
                                {schedule.place}
                            </Grid>
                            <Grid container style={{ marginBottom: "20px" }}>
                                {calendar.name}
                            </Grid>
                            <Grid container style={{ marginBottom: "20px" }}>
                                <Button color={"warning"}>수정</Button>
                            </Grid>
                        </main>
                    </section>
                ) : null
            }
        </div>
    );
};

export default EventModal;
