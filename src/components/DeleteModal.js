import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { call } from "../service/ApiService";

const DeleteModal = (props) => {
  const { open, close } = props;
  const [calNo, setCalNo] = useState(props.calNo);
  console.log("kang6666666666666666666666", props.calNo);
  const [email, setEmail] = useState("");
  const [mail, setmail] = useState("");

  useEffect(() => {
    call("/calendar/" + calNo, "GET").then((response) => {
      setmail(response.data);
      console.log("112asdasdasd112", response.data);
    });
    call("/calendar/share", "GET").then((response) => {
      // setSahre(response);
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      setEmail(filteredData);
      console.log("asdasdasd112", response.data);
      console.log("asdasdasd11233", filteredData);
    });
  }, []);
  console.log("가나다라마바사", email);
  const deleteButton = () => {
    call("/calendar", "DELETE", calNo).then((response) => {
      // setmail(response.data);
      console.log("112asdasdasd112", response.data);
    });
    window.location = "/settings";
  };
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <div>Remove calendar?</div>
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={deleteButton}
            >
              Completion
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

export default DeleteModal;
