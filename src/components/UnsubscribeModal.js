import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { fi } from "date-fns/locale";

const UnsubscribeModal = (props) => {
  const { open, close } = props;
  // const { shareNo, setShareNo } = useState(props.shareNo);
  const [calNo, setCalNo] = useState(props.calNo);
  const [shareNo, setShareNo] = useState([]);
  const [email, setEmail] = useState("");
  const [mail, setmail] = useState("");

  useEffect(() => {
    call("/calendar/" + calNo, "GET").then((response) => {
      setmail(response.data);
      console.log("캘린더 번호???", calNo);
      console.log("이건 뭔가요???", response.data);
    });
    call("/calendar/share", "GET").then((response) => {
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      filteredData.filter((item) => setShareNo(item.shareNo));
      setEmail(filteredData);
      console.log("이건 뭐죠????", response.data);
      console.log("filteredData", filteredData);
    });
    // call("/share", "GET").then((response) => {});
  }, []);

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
                구독 취소하시겠습니까? <br />
                <br />
                더 이상 이 캘린더 및 일정에 액세스할 수 없게 됩니다.
                <br /> 캘린더에 액세스할 수 있는 다른 사용자는 계속 사용할 수
                있습니다.
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
              확인
            </Button>
            <Button variant="contained" onClick={close}>
              취소
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default UnsubscribeModal;
