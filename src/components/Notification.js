import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {Button} from "@mui/material";
import {call} from "../service/ApiService";

const Notification = () => {
    const [notification, setNotification] = useState([]);
    const [count, setCount] = useState([]);
    const email = localStorage.getItem("email");

    useEffect(() => {
        call("/notification", "GET", null).then((response) => {
            console.log("데이터 조회 :: ", ...response.data);
            setNotification(response.data);
            for(let i = 0; i < response.data; i++){
                console.log("로그찍어보장", response.data.get(i).rdate());
            }
            setCount(response.data.length);
        });
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
        if(!isOpen) {
            const fetchData = async () => {
                const response = await call("/notification", "put", ...notification);
                console.log("변경된 데이터 조회 :: ", ...response.data);
                // 변경된 데이터를 처리하는 로직 추가
                setNotification(response.data);
            };
            fetchData();
        }
    };

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };


    return (
        <div>
            <Button onClick={handleIconClick}>
                <Badge badgeContent={count} color="secondary">
                    <FontAwesomeIcon icon={faBell} size="2xl" style={{color: "black",}}/>
                </Badge>
            </Button>
            <div className="className" style={{position: "fixed", right: "200px", zIndex: 9999}}>
                {isOpen && (
                    <Box sx={{
                        width: '100%',
                        minWidth: 100,
                        maxWidth: 999999999,
                        bgcolor: 'background.paper',
                        borderColor: '1px solid darkgray'
                    }}>
                        <List component="nav" aria-label="main mailbox folders">
                            {notification.map((item) => (
                                <div key={item.ntNo}>
                                    <ListItemButton
                                        selected={selectedIndex === 0}
                                        onClick={(event) => handleListItemClick(event, item.ntNo)}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.comment}/>
                                    </ListItemButton>
                                    <Divider/>
                                </div>
                            ))}
                        </List>
                    </Box>
                )}
            </div>
        </div>
    );
}

export default Notification;