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

  useEffect(() => {
    call("/calendar/" + calNo, "GET").then((response) => {
      setmail(response.data);
      console.log("캘린더 번호???", calNo);
      console.log("이건 뭔가요???", response.data);
      i18n.changeLanguage(response.language);
    });

    call("/calendar/share", "GET").then((response) => {
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      filteredData.filter((item) => setShareNo(item.shareNo));
      setEmail(filteredData);
      console.log("이건 뭐죠????", response.data);
      console.log("filteredData", filteredData);
    });
    fetchMemberData();
  }, [i18n]);
  // });
  // call("/share", "GET").then((response) => {});
  // }, []);

  const unsubscribe = () => {
    alert("No::::" + shareNo);
    call("/share", "DELETE", shareNo).then((response) => {});
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
