import React from 'react';
import "../../src/ShareModal.css";
import CloseIcon from "@mui/icons-material/Close";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

const ScheduleModal = (props) => {
    const {open, close, date, events} = props;

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {
                open ? (
                    <section>
                        <header>
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
