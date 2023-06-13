import React, { useState } from "react";
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

const ShareModal = (props) => {
  const { open, close, header } = props;

  const [grade, setGrade] = useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  // const han

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <span>특정 사용자와 공유</span>
            <button className="close" onClick={close}>
              <CloseIcon />
            </button>
          </header>
          <main>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                id="standard-basic"
                label="이메일로 추가"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
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
            <Button variant="contained" className="invite">
              초대
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ShareModal;
