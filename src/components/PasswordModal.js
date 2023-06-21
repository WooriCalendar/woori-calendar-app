import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call, checkPassword } from "../service/ApiService";
import { Grid } from "react-loader-spinner";
import SignupTextField from "./SignupTextField";

const PasswordModal = (props) => {
  const { open, close } = props;
  const [submail, setSubmail] = useState("");

  const [member, setMember] = useState([]);
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState();

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setMember(resp.email);
      console.log("ssssssssssssss", resp);
      console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
    });
  }, []);

  const pwChange = (e) => {
    setChecked(e.target.value);
  };

  const handleButtonClick = () => {
    const currentPasswordValue = document.getElementById("currentpw").value;
    const newPasswordValue = document.getElementById("password").value;
    const confirmPasswordValue = document.getElementById("passwordcheck").value;

    // 현존 비밀번호 체크
    checkPassword({ email: member, password: currentPasswordValue }).then(
      (resp) => {
        if (resp) {
          if (newPasswordValue === confirmPasswordValue) {
            setPassword(newPasswordValue);

            const update = {
              email: member,
              password: newPasswordValue,
            };

            call("/member/updatePassword", "PUT", update).then(() => {
              alert("성공");
              close();
            });
          } else {
            document.getElementById("passwordOut").innerText =
              "Passwords do not match.";
          }
        } else {
          document.getElementById("checkOut").innerText =
            "Current Passwords do not match.";
        }
      }
    );
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <form noValidate>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <p>비밀번호 변경</p>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <div>
                  <TextField
                    variant="outlined"
                    id="currentpw"
                    name="currentpw"
                    label="CurrentPassword"
                    type="currentpw"
                    style={{ marginBottom: "2%" }}
                    // value={currentpw}
                    onChange={pwChange}
                  />
                  <div id="checkOut" style={{ color: "red" }}></div>
                </div>
                <div>
                  <SignupTextField value="password" />
                  <SignupTextField value="passwordcheck" />
                  <div id="passwordOut" style={{ color: "red" }}></div>
                </div>
              </div>
            </form>
            <div>
              <Button
                variant="contained"
                className="invite"
                style={{ marginRight: "10px" }}
                type="submit"
                onClick={handleButtonClick}
              >
                완료
              </Button>
            </div>{" "}
          </main>
          <footer>
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
