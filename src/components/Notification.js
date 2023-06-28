import * as React from "react";
import Badge from "@mui/material/Badge";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import {
  Avatar,
  Button,
  css,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import moment from "moment/moment";
import "../css/./Notification.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NotificationModal from "./NotificationModal";
import { useTranslation } from "react-i18next";

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [count, setCount] = useState([]);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [chatt, setChatt] = useState([]);
  const [socketData, setSocketData] = useState();
  const ws = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItemNo, setSelectedItemNo] = useState(null);
  const [emptyMsg, setEmptyMsg] = useState();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const memberLanguage = memberData.language; // 멤버 데이터에서 언어 값을 추출
        setLanguage(memberLanguage); // 언어 값을 상태에 설정
        i18n.changeLanguage(memberLanguage); // 언어 값을 i18n에 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    loadData();
  }, [i18n]);

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setEmail(response.email);
    });
  }, []);
  const handleMouseEnter = (itemNo) => {
    setHoveredItem(itemNo);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const msgBox = chatt
    .slice()
    .reverse()
    .map((item, idx) => (
      // <div key={idx} className={item.name === name ? 'me' : 'other'}>
      <div key={idx}>
        <ListItemButton
          onClick={(event) => handleListItemClick(event, item.msg)}
        >
          <List sx={{ width: "100%", maxWidth: 360 }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <span style={{ wordWrap: "break-word" }}>
                        {item.comment}
                      </span>
                      <span>
                        <Typography
                          color="red"
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {new Date(item.date) <= new Date(Date.now() - 100)
                            ? "New!"
                            : ""}
                        </Typography>
                      </span>
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
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
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      setChatt(tempData);
    }
  }, [socketData]);

  const onText = (event) => {
    setMsg(event.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:8080/socket/chatt");
    ws.current.onmessage = (message) => {
      console.log("메시지 수신", message);
      setEmptyMsg(null);
      const dataSet = JSON.parse(message.data);
      if (dataSet.revEmail === email) {
        setCount(count + 1);
        console.log("나한테옴?");
        setSocketData(dataSet);
      }
    };
  });

  const handleButtonClick = (itemNo) => {
    setSelectedItemNo(itemNo);
  };
  const send = useCallback(() => {
    webSocketLogin();

    const data = {
      sendEmail: "",
      revEmail: "7ceojun@naver.com",
      comment: "알림이 없어요!",
      type: "test",
      date: "",
      calNo: 3,
      nno: 20,
    }; //전송 데이터(JSON)
    const temp = JSON.stringify(data);
    if (ws.current.readyState === 0) {
      //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => {
        //webSocket이 맺어지고 난 후, 실행
        console.log("발송완료1");
        ws.current.send(temp);
      };
    } else {
      console.log("발송완료2");
      ws.current.send(temp);
    }
  });
  useEffect(() => {
    call("/notification", "GET", null).then((response) => {
      if (response.data.length !== 0) {
        setNotification(response.data);
        // setEmail(response.data[0].revEmail);
        setCount(response.data.filter((item) => item.rdate == null).length);
      } else {
        setEmptyMsg(
          <ListItemButton>
            <Typography>{t("No notifications!")}</Typography>
          </ListItemButton>
        );
      }
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    if (notification.length !== 0) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        const fetchData = async () => {
          const response = await call("/notification", "put", ...notification);
          setNotification(response.data);
        };
        fetchData();
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Button onClick={handleIconClick}>
        <Badge
          badgeContent={notification.length !== 0 ? count : null}
          color="secondary"
        >
          <FontAwesomeIcon
            icon={faBell}
            size="2xl"
            style={{ color: "black" }}
          />
        </Badge>
      </Button>
      <div
        className="className"
        style={{ position: "fixed", right: "200px", zIndex: 9999 }}
      >
        <TransitionGroup>
          {isOpen && (
            <CSSTransition timeout={300} classNames="notification-fade">
              <Box
                sx={{
                  width: "100%",
                  minWidth: 100,
                  maxWidth: 999999999,
                  bgcolor: "background.paper",
                  // borderLeft: '1px solid #444444',
                }}
              >
                <Divider />
                <List
                  component="nav"
                  aria-label="main mailbox folders"
                  sx={{ maxHeight: 400, overflow: "auto" }}
                >
                  {msgBox}
                  {emptyMsg}
                  {[...notification].reverse().map((item) => (
                    <div key={item.ntNo}>
                      <ListItemButton
                        onMouseEnter={() => handleMouseEnter(item.ntNo)}
                        onMouseLeave={handleMouseLeave}
                        selected={selectedIndex === 0}
                        onClick={(event) =>
                          handleListItemClick(event, item.ntNo)
                        }
                      >
                        <List sx={{ width: "100%", maxWidth: 360 }}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  {hoveredItem === item.ntNo && (
                                    <Button
                                      onClick={() =>
                                        handleButtonClick(item.ntNo)
                                      }
                                      style={{
                                        position: "absolute",
                                        top: "5%",
                                        right: "2px",
                                        transform: "translateY(-50%)",
                                        color: "black",
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faXmark}
                                        style={{ marginLeft: "10px" }}
                                      />
                                    </Button>
                                  )}
                                  <Typography
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span style={{ wordWrap: "break-word" }}>
                                      {item.comment}
                                    </span>
                                    <span>
                                      <Typography
                                        color="red"
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                      >
                                        {new Date(item.rdate) >
                                        new Date(Date.now() - 100)
                                          ? "New!"
                                          : ""}
                                      </Typography>
                                    </span>
                                  </Typography>
                                </React.Fragment>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {item.sendEmail}
                                  </Typography>
                                  {" — " +
                                    moment(new Date(item.sdate)).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </List>
                      </ListItemButton>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Box>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
      {selectedItemNo && <NotificationModal itemNo={selectedItemNo} />}
    </div>
  );
};

export default Notification;
