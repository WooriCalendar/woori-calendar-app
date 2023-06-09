import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { call, fetchMemberData } from "../service/ApiService";
import { fi } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const UnsubscribeModal = (props) => {
  const { open, close } = props;
  // const { shareNo, setShareNo } = useState(props.shareNo);
  const [calNo, setCalNo] = useState(props.calNo);
  const [shareNo, setShareNo] = useState([]);
  const [email, setEmail] = useState("");
  const [mail, setmail] = useState("");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    call("/calendar/" + calNo, "GET").then((response) => {
      setmail(response.data);
      i18n.changeLanguage(response.language);
    });

    call("/calendar/share", "GET").then((response) => {
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      filteredData.filter((item) => setShareNo(item.shareNo));
      setEmail(filteredData);
    });
    fetchMemberData();
  }, [i18n]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");
    console.log("웹소켓연결성공")
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
    };
    setWebSocket(ws);
    return () => ws.close();
  }, []);
  const unsubscribe = () => {
    sendMessage();
    console.log("No::::" + shareNo);
    call("/share", "DELETE", shareNo).then((response) => {
      window.location = "/settings";
    });

  };
  const sendMessage = () => {
    console.log("메시지 발송")
    if (webSocket) {
      webSocket.send("Hello from React!");
    }
  };

  return (
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
            <section>
              <main>
                <div style={{ marginBottom: "5px" }}>
                  <div>
                    {t("Are you sure you want to unsubscribe?")} <br />
                    <br />
                    {t(
                        "You will no longer have access to these calendars and events."
                    )}
                    <br />{" "}
                    {t(
                        "Other users with access to the calendar can continue to use it."
                    )}
                  </div>
                </div>
              </main>
              <footer>
                <Button
                    variant="contained"
                    className="invite"
                    style={{ marginRight: "10px" }}
                    onClick={unsubscribe}
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

export default UnsubscribeModal;