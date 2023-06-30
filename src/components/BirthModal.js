import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BirthModal = (props) => {
  const { open, close, BirthdayChange } = props;
  const [birthday, setBirthday] = useState("");
  const [birth, setBirth] = useState("");

  const [email, setEmail] = useState([]);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
      i18n.changeLanguage(resp.language);
      setBirthday(moment(resp.birthday).format("YYYY-MM-DD"));
    });
    fetchMemberData();
  }, [i18n]);

  const handleBirthdayChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // 숫자만 추출
    const formattedValue = numericValue.slice(0, 8); // 최대 8자리 숫자로 제한
    const formattedBirthday = moment(formattedValue, "YYYYMMDD").format(
      "YYYY-MM-DD"
    );
    setBirthday(formattedBirthday);
    setBirth(formattedValue);
  };

  const editEventHandler = () => {
    if (birthday === "") {
      // 생년월일이 비어있을 경우 수정하지 않음
      close();
      return;
    }

    const updatedItem = {
      ...email,
      birthday: moment(birthday, "YYYY-MM-DD").format("YYYY-MM-DD"),
    };

    call("/member", "PUT", updatedItem).then((resp) => {
      // console.log("response:", resp);
      BirthdayChange(birth);
      close();
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                id="birthday"
                label={t("birthday")}
                variant="outlined"
                value={birthday}
                onChange={handleBirthdayChange}
                inputProps={{
                  pattern: "\\d{4}-\\d{2}-\\d{2}",
                  inputMode: "numeric",
                }}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={editEventHandler}
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

export default BirthModal;
