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
import { call, inviteEmail, signupemail } from "../service/ApiService";

const ShareModal = (props) => {
  const { open, close, calNo, name } = props;

  const [grade, setGrade] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState();
  const [search, setSearch] = useState(false);
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
    setTimeout(() => {
      inviteEmail({ email, calNo, name, grade }).then((resp) => {
        console.log("발송");
        setCode(resp);
        console.log(code);
      });
    }, 100);
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
    }
    {
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

  const sendSearchRequest = () => {
    // 검색 요청을 처리하는 로직을 구현하고, searchText를 활용합니다.
    console.log("검색 요청:", email);
    call("/member/findemail", "POST", { email }).then((resp) => {
      if (resp.email) {
        document.getElementById(
          "emailCheck"
        ).innerHTML = `<button id="email">${email}</button>`;
      }
    });
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {/* {header} */}
            <span>특정 사용자와 공유</span>
            <button className="close" onClick={close}>
              <CloseIcon />
            </button>
          </header>
          <main>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                label="이메일로 추가"
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
              <InputLabel id="demo-simple-select-label">권한</InputLabel>
              <Select
                id="outlined-select-currency"
                label="권한"
                defaultValue="0"
                onChange={handleChange}
              >
                <MenuItem value={0}>보기</MenuItem>
                <MenuItem value={1}>편집</MenuItem>
                <MenuItem value={2}>관리</MenuItem>
              </Select>
            </FormControl>
          </main>
          <footer>
            <Button variant="contained" id="invite" onClick={invite}>
              초대
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ShareModal;
