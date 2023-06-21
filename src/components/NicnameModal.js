import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call } from "../service/ApiService";

const NicnameModal = (props) => {
  const { open, close } = props;
  const [nickname, setNickName] = useState("");

  const [email, setEmail] = useState([]);

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
      nickname: document.getElementById("standard-basic").value,
    };
    console.log("riprip", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("rrrrrrrrrr::", resp);
      close();
    });
  };

  const handleNameChange = (e) => {
    setNickName(e.target.value);
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
                id="standard-basic"
                label="닉네임"
                variant="outlined"
                defaultValue={email.nickname}
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

export default NicnameModal;
