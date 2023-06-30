import React, {useEffect, useRef, useState} from "react";
import {Checkbox, FormControlLabel, Button} from "@mui/material";
import {call} from "../service/ApiService";
import FullCalendars from "./FullCalendars";
import {faEllipsisVertical, faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ListItemButton from "@mui/material/ListItemButton";
import CalModify from "./CalModify";
import {Link} from 'react-router-dom';
import List from "@mui/material/List";
import {useDispatch, useSelector} from "react-redux";

const Category = (props) => {
    const [calendars, setCalendars] = useState([]);
    const calendarRef = useRef({});
    const [hoveredItem, setHoveredItem] = useState(null);

    const calNo = useSelector(state => state.calNo);
    console.log(calNo)

    const dispatch = useDispatch();

    const handleMouseEnter = (itemNo) => {
        setHoveredItem(itemNo);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const categoryChange = props.onCategoryChange;

    /**
     * @Author K-설하
     * 회원 이메일을 통하여 캘린더 가져오기
     * */
    useEffect(() => {
        call("/calendar/share", "GET", null).then((response) => {
            setCalendars(response.data);
        });
    }, []);

    const onCategoryChange = async (e) => {
        await call("/share/" + e.target.value, "GET", null)
            .then((response) => {
                calendarRef.current = response.data[0]
            })

        calendarRef.current.checked = !calendarRef.current.checked

        await call("/share", "PUT", calendarRef.current)
            .then((response) => {
            })
        categoryChange()
    }
    return (
        <>
            {
                calendars.map((item) => (
                    <ListItemButton key={item.calNo}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={() => handleMouseEnter(item.calNo)}
                                    onMouseLeave={handleMouseLeave}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={item.calName}
                                    value={item.shareNo}
                                    defaultChecked={item.checked}
                                    onChange={onCategoryChange}
                                    style={{color: item.color}}
                                />
                            }
                            label={
                                hoveredItem === item.calNo && item.calName.length > 7 ? item.calName.slice(0, 7) + "..." : (item.calName.length > 8 ? item.calName.slice(0, 8) + "..." : item.calName)
                            }
                        />
                        {hoveredItem === item.calNo && item.calNo !== 90 && item.calNo !== 98 &&(
                            <Link
                                to={`/settings`}
                                state={{calNo: item.calNo}}
                                onClick={() => {
                                    dispatch({type : 'SET', value : item.calNo})
                                }}
                            >
                                {/*<Button*/}
                                {/*    style={{*/}
                                {/*        position: 'absolute', right: '0'*/}
                                {/*    }}*/}
                                {/*>*/}
                                    <FontAwesomeIcon
                                        style={{color: 'black'}}
                                        icon={faEllipsisVertical}
                                    />
                                {/*</Button>*/}
                            </Link>
                        )}
                    </ListItemButton>
                ))
            }
        </>
    );
};

export default Category;
