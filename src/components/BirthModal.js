import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import moment from "moment";

const BirthModal = (props) => {
  const { open, close } = props;
  const [birthday, setBirthday] = useState("");

  const [email, setEmail] = useState([]);

  // const [grade, setGrade] = useState("");
  // const handleChange = (event) => {
  //   setGrade(event.target.value);
  // };

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
    });
  }, []);

  const editEventHandler = () => {
    const updatedItem = {
      ...email,
      birthday: document.getElementById("birthday").value,
    };
    console.log("riprip", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("rrrrrrrrrr::", resp);
    });
  };

  const handleNameChange = (e) => {
    setBirthday(e.target.value);
    console.log("0000000000000000", handleNameChange);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            {/* {email.map((item) => ( */}
            <div style={{ marginBottom: "5px" }}>
              <TextField
                // fullWidth
                id="birthday"
                label="생년월일"
                variant="outlined"
                defaultValue={moment(email.birthday).format("YYYY-MM-DD") || ""} //   {email.birthday}
                onChange={handleNameChange}
              />
            </div>
            {/* ))} */}
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={editEventHandler}
            >
              완료
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

export default BirthModal;
