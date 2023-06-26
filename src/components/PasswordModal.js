import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call, checkPassword, fetchMemberData } from "../service/ApiService";
import { Grid } from "react-loader-spinner";
import PasswordTextField from "./PasswordTextField";
import { useTranslation } from "react-i18next";
const PasswordModal = (props) => {
  const { open, close } = props;
  const [submail, setSubmail] = useState("");

  const [member, setMember] = useState([]);
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setMember(resp.email);
      console.log("ssssssssssssss", resp);
      console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
      i18n.changeLanguage(resp.language);
    });
    fetchMemberData();
  }, [i18n]);

  const pwChange = (e) => {
    setChecked(e.target.value);
  };

  const handleButtonClick = () => {
    const currentPasswordValue = document.getElementById("currentpw").value;
    const newPasswordValue = document.getElementById("password").value;
    const confirmPasswordValue = document.getElementById("passwordcheck").value;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
    // 현존 비밀번호 체크
    checkPassword({ email: member, password: currentPasswordValue }).then(
      (resp) => {
        if (resp) {
          if (
            passwordRegEx.test(document.getElementById("password").value) ||
            passwordRegEx.test(document.getElementById("passwordcheck").value)
          ) {
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
              document.getElementById("passwordOut").innerText = t(
                t("Passwords do not match.")
              );
            }
          } else {
            document.getElementById("checkOut").innerText = t(
              t("Current Passwords do not match.")
            );
          }
        } else {
          document.getElementById("passworddOut").innerText = t(
            t(
              "Please enter a password between 8 and 20 characters with a mixture of uppercase and lowercase letters and numbers."
            )
          );
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
                <p>{t("Change Password")}</p>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <div>
                  <TextField
                    variant="outlined"
                    id="currentpw"
                    name="currentpw"
                    label={t("CurrentPassword")}
                    type="password"
                    style={{ marginBottom: "2%" }}
                    // value={currentpw}
                    onChange={pwChange}
                  />
                  <div id="checkOut" style={{ color: "red" }}></div>
                </div>
                <div>
                  <PasswordTextField value="password" />
                  <PasswordTextField value="passwordcheck" />
                  <div id="passwordOut" style={{ color: "red" }}></div>
                  <div id="passworddOut" style={{ color: "red" }}></div>
                </div>
              </div>
            </form>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                className="invite"
                style={{ marginRight: "10px" }}
                type="submit"
                onClick={handleButtonClick}
              >
                {t("Complete")}
              </Button>
              <Button variant="contained" onClick={close}>
                {t("Cancel")}
              </Button>
            </div>{" "}
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default PasswordModal;
