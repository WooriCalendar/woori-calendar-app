import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { call, checkPassword, fetchMemberData } from "../service/ApiService.js";
import { useTranslation } from "react-i18next";
const DeleteMember = (props) => {
  const { open, close } = props;
  const [member, setMember] = useState("");
  const [password, setPassword] = useState("");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((response) => {
      setMember(response.email);
      // console.log("모달의모달의모달", response.email);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    checkPassword({ email: member, password: password }).then((resp) => {
      if (resp) {
        // alert("비밀번호가 일치합니다");
        call("/member", "DELETE", { member }).then((resp) => {
          window.location = "/login";
          // console.log("삭제삭제삭제삭제", member);
        });
      } else {
        document.getElementById("passwordOut").innerText = t(
          t("Passwords do not match.")
        );
      }
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <form noValidate>
              <div
                container
                item
                xs={12}
                style={{ marginTop: "3%", marginBottom: "3%" }}
                spacing={2}
              >
                <div container item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label={t("password")}
                    autoComplete="password"
                    style={{ marginBottom: "2%" }}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div
                  id="passwordOut"
                  style={{ color: "red" }}
                  item
                  xs={6}
                ></div>
              </div>
            </form>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={submit}
            >
              {t("Secession")}
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

export default DeleteMember;
