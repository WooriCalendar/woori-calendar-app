import React, { useEffect, useState, useRef } from "react";
import ShareModal from "./ShareModal";
import { Button, TextField, MenuItem, Grid, Select } from "@mui/material";
// import Navigation from "./Navigation";
import { call, fetchMemberData } from "../service/ApiService";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { BlockPicker } from "react-color";
import axios from "axios";
import UnsubscribeModal from "./UnsubscribeModal";
import { useTranslation } from "react-i18next";
import { eachMonthOfInterval } from "date-fns";

const CalModify = (props) => {
  const [calNo, setCalNo] = useState(props.calNo);
  const [shareNo, setShareNo] = useState([]);
  const [email, setEmail] = useState([]);
  const [grade, setGrade] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userGrade, setUserGrade] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bmodalOpen, setBmodalOpen] = useState(false);
  const [cmodalOpen, setCmodalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const colorRef = useRef("");
  const [time, setTime] = useState("");
  const [calColor, setCalColor] = useState();
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const bopenModal = () => {
    setBmodalOpen(true);
  };
  const bcloseModal = () => {
    setBmodalOpen(false);
  };
  const copenModal = () => {
    setCmodalOpen(true);
  };
  const ccloseModal = () => {
    setCmodalOpen(false);
  };

  const [calendar, setCalendar] = useState([]);
  // const { calNo } = useParams();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  // console.log("0000000000909090", calNo);
  // const [items, setItems] = useState([]);
  // const updateItem = (items) => {
  //   call("/calendar/" + calNo, "PUT", items).then((resp) =>
  //     setItems(resp.data)
  //   );
  // };
  const [istitleCheck, setIstitleCheck] = useState(false);
  const nameRegEx = /^[ㄱ-ㅎ가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{}?\s]{2,20}$/;
  const handleNameChange = (e) => {
    setName({
      ...calendar,
      name: e.target.value,
    });

    nameRegEx.test(e.target.value);
    if (!nameRegEx.test(e.target.value)) {
      document.getElementById("titleCheck").innerText = t(
        t("Please enter at least 2 characters and no more than 20 characters")
      );
    } else {
      document.getElementById("titleCheck").innerText = t("it's possible");
      setIstitleCheck(true);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onColorChange = (e) => {
    colorRef.current = e.hex;
    setCalColor(colorRef.current);
    document.querySelector(".color .notranslate").innerHTML = colorRef.current;
  };


  // console.log("asdasdasasd", colorRef.current);
  const editEventHandler = () => {
    const updatedItem = {
      calNo: document.getElementById("outlined-required-calno").value,
      // calNo: calendar.calNo;
      name: document.getElementById("outlined-required-name").value,
      comment: document.getElementById("outlined-required-com").value,
      timeZone: time,
      color: calColor,
    };
    // console.log("아이템", updatedItem);
    // console.log(document.getElementById("outlined-select-currency").value);
    if (istitleCheck) {
      call("/calendar", "PUT", updatedItem).then((resp) => {
        // console.log(resp);
      });
      window.location.pathname = "/settings";
    }
  };

  // calNo로 기존에 입력된 캘린더 가져오기
  useEffect(() => {
    call("/calendar/" + calNo, "GET", null).then((response) => {
      // console.log("캘린더 데이터");
      // console.log("3333336666666333", response);
      setCalendar(response.data);
      i18n.changeLanguage(response.language);
      console.log("이 캘린더 번호:::", response.data);
      setTime(response.data[0].timeZone.split(" ")[0]);
      // colorRef.current = response.data[0].color;
      // console.log("text::"+text);
      setCalColor(response.data[0].color);
      document.querySelector(".color .notranslate").innerHTML = response.data[0].color;

      if (nameRegEx.test(response.data[0].name)) {
        setIstitleCheck(true);
      }

    });
    call("/share/retrieve/" + calNo, "GET", null).then((response) => {
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      const shareNo = filteredData.map((item) => item.shareNo);
      setShareNo(shareNo);
      const email = filteredData.map((item) => item.email);
      setEmail(email);
      const grade = filteredData.map((item) => item.grade);
      setGrade(grade);
    });
    call("/calendar/share", "GET").then((response) => {
      const filteredData = response.data.filter((item) => item.calNo === calNo);
      filteredData.map((item) => setUserEmail(item.email));
      filteredData.map((item) => setUserGrade(item.grade));
      console.log("이 캘린더의 shareNo", response.data);
      console.log("이 캘린더의 shareNo2", filteredData);
      console.log("이 유저 메일", userEmail);
      console.log("이 유저 등급", userGrade);
    });
    fetchMemberData();
  }, [i18n]);

  const [timeZones, setTimeZones] = useState([]);
  const [timeZone, setTimeZone] = useState("");
  useEffect(() => {
    axios.get("https://worldtimeapi.org/api/timezone/").then((res) => {
      // console.log(res.data)
      setTimeZones(res.data);
    });
  }, []);

  const onTimeZoneChange = async (e) => {
    await axios
      .get("https://worldtimeapi.org/api/timezone/" + e.target.value)
      .then((response) => {
        const timeZone =
          e.target.value + " (utc " + response.data.utc_offset + ")";
        setTimeZone(timeZone);
        setTime(e.target.value)
      });
  };

  const handleChange = (e, index) => {
    const updatedShareNo = [...shareNo]; // shareNo 배열 복사
    const currentShareNo = updatedShareNo[index]; // 해당 인덱스의 shareNo 값 가져오기
    const updatedEmail = [...email];
    const currentEmail = updatedEmail[index];
    const updatedGrade = [...grade];
    updatedGrade[index] = e.target.value;
    setGrade(updatedGrade);

    const updatedItem = {
      shareNo: currentShareNo,
      email: currentEmail,
      grade: updatedGrade[index],
    };

    call("/share", "PUT", updatedItem).then((resp) => {
      console.log("새로운 값", updatedItem);
    });
  };

  return (
    <div>
      <div className="main" style={{ width: "440px", margin: "0 auto" }}>
        <Grid
          container
          style={{ marginTop: 20, marginLeft: "20px", marginBottom: "20px" }}
        >
          <TextField
            select
            style={{ width: 400 }}
            label={t("Color")}
            className={"color"}
            disabled={userGrade === 0}
            value={"color"||""}
          >
            <BlockPicker
              width={400}
              colors={[
                "#FF6900",
                "#FCB900",
                "#7BDCB5",
                "#00D084",
                "#8ED1FC",
                "#0693E3",
                "#ABB8C3",
                "#EB144C",
                "#F78DA7",
                "#9900EF",
              ]}
              onChange={onColorChange}
              color={calColor}
            />
          </TextField>
        </Grid>
        {calendar.map((item) => (
          <div key={item.calNo} style={{ textAlign: "center", margin: "10px" }}>
            <TextField
              style={{ width: "400px", display: "none" }}
              id="outlined-required-calno"
              label={t("Name")}
              defaultValue={calendar.calNo}
              value={item.calNo}
              onChange={handleNameChange}
              variant="outlined"
            ></TextField>
            <Grid>
              <TextField
                style={{ width: "400px", marginBottom: "25px" }}
                id="outlined-required-name"
                label={t("Name")}
                defaultValue={item.name}
                onChange={handleNameChange}
                variant="outlined"
                disabled={userGrade === 0}
                rows={4}

              />
              <div id="titleCheck" style={{ color: "red" }}></div>
            </Grid>
            <TextField
              style={{ width: "400px" }}
              id="outlined-required-com"
              label={t("Comment")}
              defaultValue={item.comment}
              onChange={handleCommentChange}
              variant="outlined"
              multiline
              disabled={userGrade === 0}
              rows={4}
            />
          </div>
        ))}
        <div>
          <Grid container style={{ marginLeft: "20px", marginTop: 20 }}>
            <TextField
              select
              style={{ width: 400 }}
              label={t("timeZone")}
              onChange={onTimeZoneChange}
              defaultValue={time}
              value={time}
              disabled={userGrade === 0}

            >
              {timeZones.map((timeZone) => (
                <MenuItem value={timeZone}>{timeZone}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </div>

        <div style={{ textAlign: "left", margin: "20px" }}>
          <p>{t("Share with specific people")}</p>
          {email.map((email, index) => (
            <div key={email} style={{ display: "flex", alignItems: "center" }}>
              <TextField variant="standard" disabled defaultValue={email} />
              <div style={{ marginLeft: "auto" }}>
                {/* {index[email]} */}
                <Select
                  variant="standard"
                  value={grade[index]}
                  disabled={userGrade !== 2 || userEmail === email}
                  onChange={(e) => handleChange(e, index)}
                >
                  <MenuItem value={0}>{t("View")}</MenuItem>
                  <MenuItem value={1}>{t("Editing")}</MenuItem>
                  <MenuItem value={2}>{t("Management")}</MenuItem>
                </Select>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "left", margin: "20px" }}>
          {userGrade === 2 ? (
            <Button variant="outlined" onClick={openModal}>
              {t("Invite users")}
            </Button>
          ) : null}
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
          <Button variant="text" onClick={copenModal}>
            {t("Unsubscribe from")}
          </Button>
          <UnsubscribeModal
            open={cmodalOpen}
            close={ccloseModal}
            calNo={calNo}
          />
          {userGrade === 2 ? (
            <Button variant="text" color="error" onClick={bopenModal}>
              {t("delete calendar")}
            </Button>
          ) : null}
          <DeleteModal open={bmodalOpen} close={bcloseModal} calNo={calNo} />
        </div>
        <div style={{ textAlign: "right", margin: "20px" }}>
          <Button variant="contained" onClick={editEventHandler}>
            {t("Completion")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalModify;
