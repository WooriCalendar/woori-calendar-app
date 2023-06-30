import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";
import moment from "moment";

const EventDeleteModal = (props) => {
  const { open, close, scheduleDTO } = props;
  console.log("deleteupdatedItem2" + scheduleDTO);
  const { t, i18n } = useTranslation();
  const dateRef = useRef(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const untilRef = useRef(
    moment(new Date().setMonth(new Date().getMonth() + 1)).format("YYYY-MM-DD")
  );
  const repeatRef = useRef("");
  const [schedule, setSchedule] = useState({
    scNo: "",
    title: "",
    comment: "",
    start: dateRef.current,
    end: dateRef.current,
    calNo: "",
    place: "",
    rrule: {},
    status: "",
  });
  const [webSocket, setWebSocket] = useState();
  useEffect(() => {
    setSchedule(scheduleDTO);
    const ws = new WebSocket("ws://localhost:8080/ws");
    console.log("웹소켓연결성공")
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    setWebSocket(ws);
    return () => ws.close();
  }, [scheduleDTO]);

  const sendMessage = () => {
    if (webSocket) {
      webSocket.send("Hello from React!");
    }
  };

  const deleteButton = () => {
    const updatedItem = {
      ...schedule,
      rrule: { ...schedule.rrule },
      // rrule: { until: untilRef, freq: repeatRef },
    };
    // console.log("deleteupdatedItem", ...schedule);
    // console.log("deleteupdatedItem2", ...updatedItem);

    call("/schedule", "DELETE", scheduleDTO.scNo).then((response) => {
      console.log("responseresponse", response);
      sendMessage();
    });
    window.location.pathname = "/";
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div
              style={{ marginBottom: "5px", width: "300px", height: "100px" }}
            >
              <span> {t("Are you sure to delete the schedule?")}</span>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={deleteButton}
            >
              {t("Complete")}
            </Button>
            <Button variant="contained" onClick={close}>
              {t("Cancel")}
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default EventDeleteModal;
