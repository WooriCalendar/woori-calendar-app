import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import { Grid } from "react-loader-spinner";

const PasswordModal = (props) => {
  const { open, close } = props;
  const [submail, setSubmail] = useState("");

  const [email, setEmail] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
      console.log("ssssssssssssss", resp);
      console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
    });
  }, []);

  const editEventHandler = () => {
    // 비밀번호 변경 로직 구현
    if (currentPassword !== email.password) {
      setPasswordError("현존 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    // const editEventHandler = () => {
    // const updatedItem  = () => {
    const updatedItem = {
      ...email,
      password: document.getElementById("password-a").value,
    };
    console.log("riprip", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("rrrrrrrrrr::", resp);
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
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p>비밀번호 변경</p>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                id="current-password"
                label="현존 비밀번호"
                variant="outlined"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                id="new-password"
                label="새 비밀번호"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
                style={{ marginBottom: "15px" }}
              />
              <TextField
                id="confirm-password"
                label="새 비밀번호 확인"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordError !== ""}
                helperText={passwordError}
                style={{ marginBottom: "15px" }}
              />
              {/* <TextField
                // fullWidth
                id="password"
                label="현존 비밀번호"
                variant="outlined"
                // defaultValue={email.subemail}
                value={email.password || ""}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginBottom: "15px" }}
              /> */}
              {/* <TextField
                // fullWidth
                id="password-a"
                label="새 비밀번호 "
                variant="outlined"
                defaultValue={""} //{email.subemail}
                onChange={handleNameChange}
              />
              <TextField
                // fullWidth
                id="password-a"
                label="새 비밀번호 확인 "
                variant="outlined"
                defaultValue={""} //{email.subemail}
                onChange={handleNameChange}
              /> */}
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

export default PasswordModal;
