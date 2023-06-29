import React, {useEffect, useState, useRef} from "react";
import ShareModal from "./ShareModal";
import {Button, TextField, MenuItem, Grid, Select} from "@mui/material";
// import Navigation from "./Navigation";
import {call, fetchMemberData} from "../service/ApiService";
import {useParams} from "react-router-dom";
import DeleteModal from "./DeleteModal";
import {BlockPicker} from "react-color";
import axios from "axios";
import UnsubscribeModal from "./UnsubscribeModal";
import {useTranslation} from "react-i18next";
import {eachMonthOfInterval} from "date-fns";

const CalModify = (props) => {
    const calNo = props.calNo;
    const [share, setShare] = useState({});
    const [calendar, setCalendar] = useState({});
    const [shareMembers, setShareMembers] = useState([]);
    const [shareMember, setShareMember] = useState([]);
    const [timeZones, setTimeZones] = useState([]);
    const [timeZone, setTimeZone] = useState('');
    const colorRef = useRef(calendar.color);
    const [color, setColor] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [bmodalOpen, setBmodalOpen] = useState(false);
    const [cmodalOpen, setCmodalOpen] = useState(false);
    const {t, i18n} = useTranslation();
    const nameRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?\s]{2,20}$/;

    useEffect(() => {
        call("/calendar/share", "GET", null)
            .then((response) => {
                setShare(response.data.filter((cal) => cal.calNo === calNo))
            })
    }, [])

    useEffect(() => {
        call("/calendar/" + calNo, "GET", null)
            .then((response) => {
                setCalendar(response.data[0])
                document.querySelector(".color .notranslate").innerHTML = response.data[0].color
                setTimeZone(response.data[0].timeZone.split(" ")[0])
            })
    }, [])

    useEffect(() => {
        call("/share/retrieve/" + calNo, "GET", null)
            .then((response) => {
                setShareMembers(response.data)
            })
    }, [])

    useEffect(() => {
        axios.get("https://worldtimeapi.org/api/timezone/").then((res) => {
            setTimeZones(res.data);
        });
    }, []);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const bopenModal = () => {
        setBmodalOpen(true);
    };
    const bcloseModal = () => {
        setBmodalOpen(false);
    };
    const copenModal = () => {
        setCmodalOpen(true);
    };
    const ccloseModal = () => {
        setCmodalOpen(false);
    };

    const handleNameChange = (e) => {
        nameRegEx.test(e.target.value);
        if (!nameRegEx.test(e.target.value)) {
            document.getElementById("titleCheck").innerText = t(
                t("Please enter at least 2 characters and no more than 20 characters")
            );
        } else {
            document.getElementById("titleCheck").innerText = t("it's possible");
            setCalendar({...calendar, name: e.target.value});
        }
    };

    const handleCommentChange = (e) => {
        setCalendar({...calendar, comment: e.target.value});
    };

    const onColorChange = (e) => {
        colorRef.current = e.hex;
        setColor(colorRef.current);
        document.querySelector(".color .notranslate").innerHTML = colorRef.current;
    };

    const onTimeZoneChange = async (e) => {
        await axios
            .get("https://worldtimeapi.org/api/timezone/" + e.target.value)
            .then((response) => {
                setCalendar({...calendar, timeZone: e.target.value + " (utc " + response.data.utc_offset + ")"})
                setTimeZone(e.target.value)
            });
    };

    const handleChange = (e, index) => {
        setShareMember({...shareMembers[index], grade : e.target.value})
    }

    const onGradeChange = () => {
        call("/share", "PUT", shareMember)
            .then((response) => {
                console.log(response.data)
            })
    }

    const editEventHandler = () => {
        call("/calendar", "PUT", calendar)
            .then((response) => {
                    console.log(response.data)
                }
            )
    }

    console.log(timeZone)

    return (
        <div>
            <div className="main" style={{width: "440px", margin: "0 auto"}}>
                <Grid
                    container
                    style={{marginTop: 20, marginLeft: "20px", marginBottom: "20px"}}
                >
                    <TextField
                        select
                        style={{width: 400}}
                        label={t("Color")}
                        className={"color"}
                        value={"color" || ""}
                        disabled={share[0] ? share[0].grade === 0 : null}
                    >
                        <BlockPicker
                            width={400}
                            colors={[
                                "#FF6900",
                                "#FCB900",
                                "#7BDCB5",
                                "#00D084",
                                "#8ED1FC",
                                "#0693E3",
                                "#ABB8C3",
                                "#EB144C",
                                "#F78DA7",
                                "#9900EF",
                            ]}
                            onChange={onColorChange}
                            color={color}
                        />
                    </TextField>
                </Grid>

                <div key={calendar.calNo} style={{textAlign: "center", margin: "10px"}}>
                    <TextField
                        style={{width: "400px", display: "none"}}
                        id="outlined-required-calno"
                        label={t("Name")}
                        defaultValue={calendar.calNo}
                        value={calendar.calNo}
                        onChange={handleNameChange}
                        variant="outlined"
                    />

                    <Grid>
                        <TextField
                            style={{width: "400px", marginBottom: "25px"}}
                            id="outlined-required-name"
                            label={t("Name")}
                            defaultValue={calendar.name}
                            onChange={handleNameChange}
                            variant="outlined"
                            disabled={share[0] ? share[0].grade === 0 : null}
                            rows={4}
                        />
                        <div id="titleCheck" style={{color: "red"}}></div>
                    </Grid>

                    <TextField
                        style={{width: "400px"}}
                        id="outlined-required-com"
                        label={t("Comment")}
                        defaultValue={calendar.comment}
                        onChange={handleCommentChange}
                        variant="outlined"
                        multiline
                        disabled={share[0] ? share[0].grade === 0 : null}
                        rows={4}
                    />
                </div>

                <div>
                    <Grid container style={{marginLeft: "20px", marginTop: 20}}>
                        <TextField
                            select
                            style={{width: 400}}
                            label={t("timeZone")}
                            onChange={onTimeZoneChange}
                            value={timeZone}
                            defaultValue={timeZone}
                            disabled={share[0] ? share[0].grade === 0 : null}
                        >
                            {timeZones.map((timeZone) => (
                                <MenuItem value={timeZone}>{timeZone}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </div>

                <div style={{textAlign: "left", margin: "20px"}}>
                    <p>{t(
                        "Share with specific people")}</p>
                    {shareMembers
                        .map((member, index) => (
                        <div key={member.email} style={{display: "flex", alignItems: "center"}}>
                            <TextField variant="standard" disabled defaultValue={member.email}/>
                            <div style={{marginLeft: "auto"}}>
                                {/* {index[email]} */}
                                <Select
                                    variant="standard"
                                    defaultValue={member.grade}
                                    disabled={share[0] ? share[0].grade !== 2 || member.email === share[0].email : null}
                                    onChange={(e) => {
                                        handleChange(e, index)
                                        onGradeChange()
                                    }}
                                >
                                    <MenuItem value={0}>{t("View")}</MenuItem>
                                    <MenuItem value={1}>{t("Editing")}</MenuItem>
                                    <MenuItem value={2}>{t("Management")}</MenuItem>
                                </Select>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{textAlign: "left", margin: "20px"}}>
                    {
                        share[0] ?
                            (
                                share[0].grade === 2 ? (
                                    <Button variant="outlined" onClick={openModal}>
                                        {t("Invite users")}
                                    </Button>
                                ) : null
                            ) : null
                    }
                </div>

                <ShareModal
                    open={modalOpen}
                    close={closeModal}
                    calNo={calNo}
                    name={calendar.name}
                    userEmail={share[0] ? share[0].email : ''}
                />

                <div style={{textAlign: "left", margin: "20px"}}>
                    <Button variant="text" onClick={copenModal}>
                        {t("Unsubscribe from")}
                    </Button>
                    <UnsubscribeModal
                        open={cmodalOpen}
                        close={ccloseModal}
                        calNo={calNo}
                    />
                    {
                        share[0] ?
                            (
                                share[0].grade === 2 ? (
                                    <Button variant="text" color="error" onClick={bopenModal}>
                                        {t("delete calendar")}
                                    </Button>
                                ) : null
                            ) : null
                    }
                    <DeleteModal open={bmodalOpen} close={bcloseModal} calNo={calNo}/>
                </div>

                <div style={{textAlign: "right", margin: "20px"}}>
                    <Button variant="contained" onClick={editEventHandler}>
                        {t("Complete")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CalModify;
