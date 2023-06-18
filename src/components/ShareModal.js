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
import { call } from "../service/ApiService";

const ShareModal = (props) => {
  const { open, close } = props;

  const [grade, setGrade] = useState("");

  // const [search, setSearch] = useState(false);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  // const asd = (event) => {
  //   setSearch(true);
  // };
  // console.log("설치값", search);

  // 이메일 검색
  const [searchEmail, setSearchEmail] = useState();
  useEffect(() => {
    call("/member/signup", "GET", null).then((resp) => {
      setSearchEmail(resp.data);
      console.log(resp.data);
    });
  }, []);

  // "." 입력 후 1초 표시
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // setTimeout(() => {
      const inputValue = e.target.value;
      const isEmailExists = searchEmail.includes(inputValue);
      if (isEmailExists) {
        document.getElementById(
          "emailCheck"
        ).innerHTML = `<button>${inputValue}</button>`;
      } else {
        // document.innerText = "검색 결과가 없습니다.";
        document.getElementById("emailCheck").innerText =
          "검색 결과가 없습니다.";
      }
      // console.log("1초");
      console.log(inputValue);
      console.log(searchEmail.includes(inputValue));
      // }, 1000);
    }
    document.addEventListener("keydown", handleKeyDown);
  };

  // 버튼 클릭 이벤트
  const invite = () => {
    let email = document.getElementById("emailCheck").value;
    console.log(email);
  };

  //함준혁이씀 이 함수는 중복확인 하는 함수 요청을 보내고 받는다. 그에대한 값 확인
  // const handleKeyDown = (e) => {
  //   console.log("handleKeyDown 함수 실행");
  //   console.log(e.target.value);

  //   if (search === true) {
  //     // Enter시 실행

  //     call("/member/signup", "GET", null).then((resp) => {
  //       setSearchEmail(resp.data);
  //       console.log(resp.data);
  //     });

  //     console.log("enter");
  //   }
  // };

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
                // id="standard-basic"
                label="이메일로 추가"
                variant="standard"
                // value={inputValue}
                onChange={handleKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {/* 함준혁이만든거 */}
              {/* <Button onClick={asd}>hihi</Button> */}
              {/* <button id="emailCheckButton" onClick={buttonOnClick} /> */}

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
            <Button variant="contained" className="invite" onClick={invite}>
              초대
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ShareModal;
