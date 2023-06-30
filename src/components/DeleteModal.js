import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";
const DeleteModal = (props) => {
  const { open, close } = props;
  const [calNo, setCalNo] = useState(props.calNo);
  // console.log("kang6666666666666666666666", props.calNo);
  const [email, setEmail] = useState("");
  const [mail, setmail] = useState("");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {


    call("/calendar/" + calNo, "GET").then((response) => {
      setmail(response.data);
      console.log("112asdasdasd112", response.data);
      i18n.changeLanguage(response.language);
    });

    call("/calendar/share", "GET").then((response) => {
      // setSahre(response);
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      setEmail(filteredData);
      // console.log("asdasdasd112", response.data);
      // console.log("asdasdasd11233", filteredData);
    });
    fetchMemberData();
  }, [i18n]);
  const sendMessage = () => {
    console.log("메시지 발송")
    if (webSocket) {
      webSocket.send("Hello from React!");
    }
  };
  // console.log("가나다라마바사", email);
  const deleteButton = () => {
    const ws = new WebSocket("ws://localhost:8080/ws");
    console.log("웹소켓연결성공")
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    setWebSocket(ws);
    sendMessage();
    call("/calendar", "DELETE", calNo).then((response) => {
      // setmail(response.data);
      console.log("112asdasdasd112", response.data);
    });
    window.location = "/settings";
    return () => ws.close();
  };
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>{t("Remove calendar?")}</div>
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

export default DeleteModal;
