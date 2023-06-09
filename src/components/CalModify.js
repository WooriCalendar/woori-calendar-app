import React, { useState } from "react";
import ShareModal from "./ShareModal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";

const CalModify = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Sidebar />
      <div className="main">
        <div style={{ textAlign: "center" }}>
          <h2>캘린더 수정</h2>
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-basic"
            label="이름"
            variant="outlined"
          />
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-textarea"
            label="설명"
            multiline
            rows={4}
          />
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <FormControl style={{ width: "400px", textAlign: "left" }}>
            <InputLabel id="demo-simple-select-label">시간대</InputLabel>
            <Select
              id="outlined-select-currency"
              select
              label="시간대"
              defaultValue="0"
            >
              <MenuItem value={0}>(GMT+09:00) 한국 표준시 - 서울</MenuItem>
              <MenuItem value={1}>
                (GMT-07:00) 미 태평양 시간 - 로스앤젤레스
              </MenuItem>
              <MenuItem value={2}>(GMT+05:00) 몰디브 시간</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-basic"
            label="공유"
            variant="outlined"
          />
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Button variant="outlined" onClick={openModal}>
            사용자 초대
          </Button>
        </div>
        <ShareModal open={modalOpen} close={closeModal} />
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Button variant="contained">구독 취소</Button>
          <Button variant="contained" color="error">
            캘린더 삭제
          </Button>
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Button variant="contained">완료</Button>
        </div>
      </div>
    </div>
  );
};

export default CalModify;
