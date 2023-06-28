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
  const { open, close, calNo, name } = props;

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
  console.log("페치", fetchMemberData);

  console.log("상위 컴포넌트에서 받아온 캘린더 번호", calNo);
  console.log("상위 컴포넌트에서 받아온 캘린더 이름", name);
  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  // 캘린더 초대 이벤트
  const invite = () => {
    console.log("메일 : ", email);
    console.log("캘린더 번호 : ", calNo);
    console.log("캘린더 이름 : ", name);
    console.log("권한 : ", grade);
    // openModal(true);
    setTimeout(() => {
      inviteEmail({ email, calNo, name, grade }).then((resp) => {
        console.log("발송");
        setCode(resp);
        console.log(code);
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
    console.log("클릭");
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
      console.log(".이 포함되어있는거 감지");
      sendSearchRequest();
    } else if (email.length < 8 && email.length > 1) {
      document.getElementById("emailCheck").innerText = "";
    } else {
      setSearch(false);
      console.log(".이 안포함되어있음");
    }

    // 다른 코드를 여기에 추가할 수 있습니다.
  }, [email]); // 의존성 배열에 email 추가

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // 검색 값 보내기
      console.log("엔터감지");
      sendSearchRequest();
    }
  };

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
    // 검색 요청을 처리하는 로직을 구현하고, searchText를 활용합니다.
    console.log("검색 요청:", email);
    call("/member/findemail", "POST", { email }).then((resp) => {
      if (resp.email) {
        buttonActivate();
      } else {
        buttonInActivate();
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
                onKeyUp={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={sendSearchRequest}>
                        <SearchIcon />
                      </Button>
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
