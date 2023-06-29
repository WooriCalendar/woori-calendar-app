import React, { useEffect, useState } from "react";
import "../../src/ShareModal.css";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { call, inviteEmail, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";

const ShareModal = (props) => {
  const { open, close, calNo, name, userEmail } = props;

  const [grade, setGrade] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState();
  const [search, setSearch] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const memberData = await fetchMemberData();
        const memberLanguage = memberData.language; // 멤버 데이터에서 언어 값을 추출
        setLanguage(memberLanguage); // 언어 값을 상태에 설정
        i18n.changeLanguage(memberLanguage); // 언어 값을 i18n에 설정
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    loadData();
  }, [i18n]);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  // 캘린더 초대 이벤트
  const invite = () => {
    setTimeout(() => {
      inviteEmail({ email, calNo, name, grade }).then((resp) => {
        setCode(resp);
        // 알림보내기
        // 보낼 내용 : ~님이 ~님을 [캘린더이름]캘린더에 초대하셨습니다.
        // 보낸 사람 : 캘린더초대자의email
        // 받을 사람 : 수신자의email
      });
    }, 100);
    openModal(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (email.includes(".")) {
      setSearch(true);
      sendSearchRequest();
    } else if (email.length > 1) {
      document.getElementById("emailCheck").innerText = "";
    } else {
      setSearch(false);
    }
  }, [email]); // 의존성 배열에 email 추가

  const buttonActivate = () => {
    setButtonDisabled(false);
    document.getElementById(
      "emailCheck"
    ).innerHTML = `<Button id="email">${email}</Button>`;
  };

  const buttonInActivate = () => {
    setButtonDisabled(true);
  };
  const sendSearchRequest = () => {
    // 검색 요청을 처리
    call("/member/findemail", "POST", { email }).then((resp) => {
      if (resp.email == null) {
        buttonInActivate();
      } else if (resp.email != userEmail) {
        buttonActivate();
      } else if (resp.email == userEmail) {
        setButtonDisabled(true);
        document.getElementById("emailCheck").innerText =
          "본인은 초대할 수 없습니다.";
      }
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <span>{t("Share with specific people")}</span>
            <button className="close" onClick={close}>
              <CloseIcon />
            </button>
          </header>
          <main>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label={t("add by email")}
                variant="standard"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <div
                id="emailCheck"
                style={{ color: "red", fontSize: "12px" }}
              ></div>
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("Permissions")}
              </InputLabel>
              <Select
                id="outlined-select-currency"
                label={t("Permissions")}
                defaultValue="0"
                onChange={handleChange}
              >
                <MenuItem value={0}>{t("View")}</MenuItem>
                <MenuItem value={1}>{t("Editing")}</MenuItem>
                <MenuItem value={2}>{t("Management")}</MenuItem>
              </Select>
            </FormControl>
          </main>
          <footer>
            <Button
              variant="contained"
              id="invite"
              onClick={invite}
              disabled={buttonDisabled}
            >
              {t("invitation")}
            </Button>
          </footer>
        </section>
      ) : null}
      {open ? (
        <div className={modalOpen ? "openModal modal" : "modal"}>
          <section>
            <main>
              <span>{email} 님에게 초대 이메일을 발송하였습니다.</span>
            </main>
            <footer>
              <Button variant="contained" id="invite" onClick={closeModal}>
                확인
              </Button>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default ShareModal;
