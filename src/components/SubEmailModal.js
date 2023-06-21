import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import { Grid } from "react-loader-spinner";

const SubEmailModal = (props) => {
  const { open, close } = props;
  const [submail, setSubmail] = useState("");

  const [email, setEmail] = useState([]);

  // const [grade, setGrade] = useState("");
  // const handleChange = (event) => {
  //   setGrade(event.target.value);
  // };

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
      console.log("ssssssssssssss", resp);
      console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
    });
  }, []);

  const editEventHandler = () => {
    const updatedItem = {
      ...email,
      subemail: document.getElementById("subemail").value,
    };
    console.log("riprip", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("rrrrrrrrrr::", resp);
      close();
    });
  };

  const handleNameChange = (e) => {
    setSubmail(e.target.value);
    console.log("0000000000000000", handleNameChange);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            {/* {email.map((item) => ( */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p>보조 이메일 변경</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            ></div>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                // fullWidth
                id="standard-basic"
                label="기존 보조 이메일"
                variant="outlined"
                // defaultValue={email.subemail}
                value={email.subemail || ""}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                // fullWidth
                id="subemail"
                label="새 보조 이메일 "
                variant="outlined"
                defaultValue={""} //{email.subemail}
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

export default SubEmailModal;
