import * as React from 'react';
import Badge from '@mui/material/Badge';
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useCallback, useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import {Avatar, Button, css, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {call} from "../service/ApiService";
import moment from "moment/moment";
import '../css/./Notification.css';
import {TransitionGroup, CSSTransition} from "react-transition-group";

const Notification = () => {
    const [notification, setNotification] = useState([]);
    const [count, setCount] = useState([]);
    const [msg, setMsg] = useState("");
    const [email, setEmail] = useState("");
    const [chatt, setChatt] = useState([]);
    const [socketData, setSocketData] = useState();
    const ws = useRef(null);

    const msgBox = chatt.slice().reverse().map((item, idx) => (
        // <div key={idx} className={item.name === name ? 'me' : 'other'}>
        <div key={idx}>
            <ListItemButton
                // selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, item.msg)}
            >
                <List sx={{width: '100%', maxWidth: 360}}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Typography
                                        sx={{display: 'flex', justifyContent: 'space-between'}}
                                    >
                                                                <span
                                                                    style={{wordWrap: 'break-word'}}>{item.comment}</span>
                                        <span><Typography color="red" variant="caption"
                                                          display="block"
                                                          gutterBottom>
            {new Date(item.date) <= new Date(Date.now() - 100) ? "New!" : ""}
      </Typography></span>
                                    </Typography>
                                </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {item.sendEmail}
                                    </Typography>
                                    {" — " + item.date}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </ListItemButton>
        </div>
    ));

    useEffect(() => {
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            setChatt(tempData);
        }
    }, [socketData]);

    const onText = event => {
        setMsg(event.target.value);
    }

    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8080/socket/chatt");
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            if(dataSet.revEmail == email) {
                setSocketData(dataSet);
            }
        }
    });

    const send = useCallback(() => {
            webSocketLogin();
        if(msg !== ''){
            const data = {
                sendEmail: "kang@gmail.com",
                revEmail: "7ceojun@naver.com",
                comment: "알림발송 Test",
                type: "test",
                date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                calNo: 3,
                nno: 20
            };  //전송 데이터(JSON)
            const temp = JSON.stringify(data);
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //////////////////////////////////////
    useEffect(() => {
        call("/notification", "GET", null).then((response) => {
            if(response) {
                setNotification(response.data);
                setEmail(response.data[0].revEmail);
                setCount(response.data.filter(item => item.rdate == null).length);
            }
        });
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            const fetchData = async () => {
                const response = await call("/notification", "put", ...notification);
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
                <TransitionGroup>
                {isOpen && (
                    <CSSTransition timeout={300} classNames="notification-fade">
                    <Box sx={{
                        width: '100%',
                        minWidth: 100,
                        maxWidth: 999999999,
                        bgcolor: 'background.paper',
                        // borderLeft: '1px solid #444444',
                    }}>
                        <Divider/>
                        <List component="nav" aria-label="main mailbox folders">
                            {msgBox}
                            {notification.map((item) => (
                                <div key={item.ntNo}>
                                    <ListItemButton
                                        selected={selectedIndex === 0}
                                        onClick={(event) => handleListItemClick(event, item.ntNo)}
                                    >
                                        <List sx={{width: '100%', maxWidth: 360}}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{display: 'flex', justifyContent: 'space-between'}}
                                                            >
                                                                <span
                                                                    style={{wordWrap: 'break-word'}}>{item.comment}</span>
                                                                <span><Typography color="red" variant="caption"
                                                                                  display="block"
                                                                                  gutterBottom>
            {new Date(item.rdate) > new Date(Date.now() - 100) ? "New!" : ""}
      </Typography></span>
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{display: 'inline'}}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {item.sendEmail}
                                                            </Typography>
                                                            {" — " + moment(new Date(item.sdate)).format("YYYY-MM-DD HH:mm:ss")}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </List>
                                    </ListItemButton>
                                        <Divider/>
                                </div>
                            ))}
                        </List>
                    </Box>
                    </CSSTransition>
                )}
                </TransitionGroup>
            </div>
        </div>
    );
}

export default Notification;