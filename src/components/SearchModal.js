import React, {useRef, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import {Button, IconButton, InputBase, Paper, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {call} from "../service/ApiService";
import moment from "moment";
import EventModal from "./EventModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

const SearchModal = (props) => {
    const {open, close} = props;
    const [result, setResult] = useState([]);
    const [eventModal, setEventModal] = useState(false);
    const scheduleRef = useRef([]);
    const [calendar, setCalendar] = useState([]);

    const onSearchTextChange = (e) => {
        if (e.target.value.length) {
            call("/schedule/search", "POST", {title : e.target.value})
                .then((response) => {
                    // console.log(response)
                    setResult(response)
                })
        } else {
            setResult([]);
        }
    }

    const closeEventModal = () => {
        setEventModal(false)
    }

    const openEventModal = async (e) => {
        setEventModal(true)

        if (e.target.getAttribute("value")) {
            await call("/schedule/" + e.target.getAttribute("value"), "GET", null)
                .then((response) => {
                    // console.log(response.data)
                    scheduleRef.current = response.data[0]
                })

            getCalendar()
        }
    }

    const getCalendar = async () => {
        await call("/calendar/" + scheduleRef.current.calNo, "GET")
            .then((response) => {
                setCalendar(response.data[0])
            })
    }

    return (
        <>
            <div className={open ? "openModal modal" : "modal"}>
                {
                    open ? (
                        <section>
                            <header>
                                <TextField
                                    onChange={onSearchTextChange}
                                />
                                <button className="close" onClick={close}>
                                    <CloseIcon />
                                </button>
                            </header>
                            <main>
                                {
                                    result.map((r) => (
                                        <Grid container value={r.scNo} style={{ marginBottom: "20px" }} onClick={openEventModal}>
                                            <FontAwesomeIcon icon={faCircle} size="xs" color={r.color} /> {!r.startTime ? moment(r.startDate).format("yyyy.MM.DD") : moment(r.startTime).format("yyyy.MM.DD")}  {r.name}
                                        </Grid>
                                    ))
                                }
                            </main>
                        </section>
                    ) : null
                }
            </div>

            <EventModal
                open={eventModal}
                close={closeEventModal}
                schedule={scheduleRef.current}
                calendar={calendar}
            />
        </>
    );
};

export default SearchModal;
