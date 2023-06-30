import React, {useState, useEffect} from "react";
import {Grid, Button, FormControlLabel, Checkbox} from "@mui/material";
import {call, fetchMemberData} from "../service/ApiService";
import {useTranslation} from "react-i18next";
import CircleIcon from '@mui/icons-material/Circle';

const SettingSidebar = ({handleSidebarClick}) => {
    const [activeComponent, setActiveComponent] = useState("Settings");
    // const { calNo } = useParams();
    const [calendar, setCalendar] = useState([]);
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState("");
    useEffect(() => {
        call("/calendar", "GET", null).then((response) => {
            console.log("캘린더 데이터");
            // console.log("333333333", response);

            setCalendar(response.data);
            // setCalNo(calNo);
            i18n.changeLanguage(response.language);
        });
        fetchMemberData();
    }, [i18n]);
    const handleClick = (component, calNo) => {
        setActiveComponent(component);
        handleSidebarClick(component, calNo);
    };

    return (
        <div style={{marginTop: "10px"}}>
            <div style={{marginTop: "20px"}}>
                <Grid>
                    <p
                        style={{ margin: "20px", cursor: "pointer" }}
                        onClick={() => handleClick("Settings")}
                    >
                        {t("Settings")}
                    </p>
                </Grid>

                <Grid>
                    <p
                        style={{ margin: "20px", minWidth: "30px", cursor: "pointer" }}
                        onClick={() => handleClick("SettingPasword")}
                    >
                        {t("My Page")}
                    </p>
                </Grid>
                <Grid>


                    <div>
                        {calendar.map((item) => {
                            if (item.calNo !== 90 && item.calNo !== 98) {
                                return (
                                    <p
                                        style={{marginLeft: 10, cursor:"pointer"}}
                                        key={item.calNo}
                                        value={item.calNo}
                                        label={item.name}

                                        onClick={() => {
                                            handleClick("Category", item.calNo);
                                        }}>
                                        <CircleIcon style={{color : item.color, fontSize : 'small', margin : '0 10'}}/>
                                        {item.name}
                                    </p>
                                );
                            }
                            return null;
                        })}
                    </div>
                    {/* <Category type="Button" onClick={() => handleClick("Category")} /> */}
                </Grid>
            </div>
        </div>
    );
};

export default SettingSidebar;