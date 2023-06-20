import React, { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
// import Navigation from "./Navigation";
import { call } from "../service/ApiService";
import { useParams } from "react-router-dom";

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
      calNo: document.getElementById("outlined-required-calno").value,
      // calNo: calendar.calNo;
      name: document.getElementById("outlined-required-name").value,
      comment: document.getElementById("outlined-required-com").value,
      timeZone: selectedTimezone,
      // timeZone: document.getElementById("outlined-select-currency").value,
    };

    console.log("아이템", updatedItem);
    console.log(document.getElementById("outlined-select-currency").value);
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
      console.log("333333333", response);
      setCalendar(response.data);
      // setCalendar(response.data);
    });
  }, []);

  const [selectedTimezone, setSelectedTimezone] = useState("");
  const TimezoneSelector = ({ onChange }) => {
    const timezones = [
      {
        value: "America/New_York",
        label: "(GMT-04:00) 미국 동부  시간 - 뉴욕",
      },
      {
        value: "America/Chicago",
        label: "(GMT-05:00) 미국 중부 시간 - 시카고",
      },
      { value: "America/Denver", label: "(GMT-06:00) 미국 산지 시간 - 덴버" },
      {
        value: "America/Los_Angeles",
        label: "(GMT-07:00) 미국 태평양시간 - 로스앤젤레스",
      },
      {
        value: "America/Anchorage",
        label: "(GMT-08:00) 알레스카 시간 - 앵커리지",
      },
      {
        value: "Pacific/Honolulu",
        label: "(GMT-10:00) 하와이 표준시 - 호놀룰루",
      },
      { value: "Asia/Seoul", label: "(GMT+09:00)한국 표준시 - 서울" },
      { value: "Asia/Tokyo", label: "(GMT+09:00)일본 표준시 - 도쿄" }, //추후 라벨에 gmt+몇인지 적을지말지
    ];

    const handleTimezoneChange = (event) => {
      const selectedTimezone = event.target.value; // 선택한 시간대 값을 가져옴
      onChange(selectedTimezone);
    };

    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <FormControl style={{ width: "400px", textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">시간대</InputLabel>
          <Select
            id="outlined-select-currency"
            label="시간대"
            defaultValue={selectedTimezone}
            onChange={handleTimezoneChange}
          >
            {timezones.map((timezone) => (
              <MenuItem key={timezone.value} value={timezone.value}>
                {timezone.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone); // 선택한 시간대 값을 상태로 설정
    console.log("cal::::::::", timezone);
  };

  return (
    <div>
      {/* <Navigation /> */}

      <div className="main" style={{ width: "440px", margin: "0 auto" }}>
        {/* <div style={{ textAlign: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>캘린더 수정</h2>
        </div> */}
        {calendar.map((item) => (
          <div key={item.calNo} style={{ textAlign: "center", margin: "10px" }}>
            <TextField
              style={{ width: "400px", display: "none" }}
              id="outlined-required-calno"
              label="이름"
              defaultValue={calendar.calNo}
              value={item.calNo}
              onChange={handleNameChange}
              variant="outlined"
              // disabled
              // type="hidden"
            ></TextField>
            {/* <div
              id="outlined-required-calno"
              style={{ display: "none" }}
              onChange={handleNameChange}
            >
              {item.calNo}
            </div> */}
            {/* <Grid style={{ marginBottom: "10px" }}>
              <TextField
                style={{ width: "400px" }}
                id="outlined-required-calno"
                label="이름"
                defaultValue={item.calNo}
                // value={name}
                onChange={handleNameChange}
                variant="outlined"
              ></TextField>
            </Grid> */}
            {/* style={{ marginBottom: "10px" }} */}
            <Grid>
              <TextField
                style={{ width: "400px", marginBottom: "25px" }}
                id="outlined-required-name"
                label="이름"
                defaultValue={item.name}
                // value={name}
                onChange={handleNameChange}
                variant="outlined"
                rows={4}
              ></TextField>
            </Grid>
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

        {/* <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-textarea"
            label="설명"
            multiline
            rows={4}
          />
        </div> */}
        <div>
          {/* <CurrentTime /> */}
          <TimezoneSelector onChange={handleTimezoneChange} />

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
        {calendar.map((item) => (
          <ShareModal
            open={modalOpen}
            close={closeModal}
            calNo={calNo}
            name={item.name}
          />
        ))}
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
