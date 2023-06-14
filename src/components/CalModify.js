import React, { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import { Button, TextField } from "@mui/material";
// import Navigation from "./Navigation";
import { call } from "../service/ApiService";
import { useParams } from "react-router-dom";
import CurrentTime from "./CurrentTime";

const CalModify = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [calendar, setCalendar] = useState([]);
  const { calNo } = useParams();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // const [items, setItems] = useState([]);
  // const updateItem = (items) => {
  //   call("/calendar/" + calNo, "PUT", items).then((resp) =>
  //     setItems(resp.data)
  //   );
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const editEventHandler = () => {
    const updatedItem = {
      calNo: calNo,
      name: document.getElementById("outlined-required-name").value,
      comment: document.getElementById("outlined-required-com").value,
    };
    console.log("아이템", updatedItem);
    console.log(name);
    console.log(comment);
    call("/calendar", "PUT", updatedItem).then((resp) => {
      console.log(resp);
      // setItems(resp);
    });
  };
  // const editEventHandler = (e) => {
  //   updateItem((items.name = e.target.value));
  //   updateItem((items.comment = e.target.value));
  // };

  // calNo로 기존에 입력된 캘린더 가져오기
  useEffect(() => {
    call("/calendar/" + calNo, "GET", null).then((response) => {
      console.log("캘린더 데이터");
      setCalendar(response.data);
    });
  }, []);

  return (
    <div>
      {/* <Navigation /> */}

      <div className="main" style={{ width: "440px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>캘린더 수정</h2>
        </div>
        {calendar.map((item) => (
          <div key={item.calNo} style={{ textAlign: "center", margin: "20px" }}>
            <TextField
              style={{ width: "400px" }}
              id="outlined-required-name"
              label="이름"
              defaultValue={item.name}
              // value={name}
              onChange={handleNameChange}
              variant="outlined"
            ></TextField>
            <TextField
              style={{ width: "400px" }}
              id="outlined-required-com"
              label="설명"
              defaultValue={item.comment}
              onChange={handleCommentChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </div>
        ))}

        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-textarea"
            label="설명"
            multiline
            rows={4}
          />
        </div>
        <div>
          <CurrentTime />
          {/* <FormControl style={{ width: "400px", textAlign: "left" }}>
            <InputLabel id="demo-simple-select-label">시간대</InputLabel>
            <Select
              id="outlined-select-currency"
              label="시간대"
              defaultValue="0"
            >
              <MenuItem value={0}>(GMT+09:00) 한국 표준시 - 서울</MenuItem>
              <MenuItem value={1}>
                (GMT-07:00) 미 태평양 시간 - 로스앤젤레스
              </MenuItem>
              <MenuItem value={2}>(GMT+05:00) 몰디브 시간</MenuItem>
            </Select>
          </FormControl> */}
        </div>

        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-basic"
            label="공유"
            variant="outlined"
          />
        </div>
        <div style={{ textAlign: "left", margin: "20px" }}>
          <Button variant="outlined" onClick={openModal}>
            사용자 초대
          </Button>
        </div>
        <ShareModal open={modalOpen} close={closeModal} />
        <div style={{ textAlign: "left", margin: "20px" }}>
          <Button variant="text">구독 취소</Button>
          <Button variant="text" color="error">
            캘린더 삭제
          </Button>
        </div>
        <div style={{ textAlign: "right", margin: "20px" }}>
          <Button variant="contained" onClick={editEventHandler}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalModify;
