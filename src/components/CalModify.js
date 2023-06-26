import React, { useEffect, useState, useRef } from "react";
import ShareModal from "./ShareModal";
import { Button, TextField, MenuItem, Grid } from "@mui/material";
// import Navigation from "./Navigation";
import { call, fetchMemberData } from "../service/ApiService";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { BlockPicker } from "react-color";
import axios from "axios";
import UnsubscribeModal from "./UnsubscribeModal";
import { useTranslation } from "react-i18next";
const CalModify = (props) => {
  const [calNo, setCalNo] = useState(props.calNo);
  const [shareNo, setShareNo] = useState(props.shareNo);
  const [modalOpen, setModalOpen] = useState(false);
  const [bmodalOpen, setBmodalOpen] = useState(false);
  const [cmodalOpen, setCmodalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const colorRef = useRef("");

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onColorChange = (e) => {
    colorRef.current = e.hex;
    document.querySelector(".color .notranslate").innerHTML = colorRef.current;
  };
  // console.log("asdasdasasd", colorRef.current);
  const editEventHandler = () => {
    const updatedItem = {
      calNo: document.getElementById("outlined-required-calno").value,
      // calNo: calendar.calNo;
      name: document.getElementById("outlined-required-name").value,
      comment: document.getElementById("outlined-required-com").value,
      timeZone: timeZone,
      color: colorRef.current,
    };
    console.log("12312312312321321321321312", timeZone);
    // console.log("아이템", updatedItem);
    // console.log(document.getElementById("outlined-select-currency").value);
    // console.log(name);
    // console.log(comment);
    call("/calendar", "PUT", updatedItem).then((resp) => {
      // console.log(resp);
    });
    window.location.pathname = "/";
  };

  // calNo로 기존에 입력된 캘린더 가져오기
  useEffect(() => {
    call("/calendar/" + calNo, "GET", null).then((response) => {
      // console.log("캘린더 데이터");
      // console.log("3333336666666333", response);
      setCalendar(response.data);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);

  //shareNo 가져오기
  // useEffect(() => {
  //   call("/share/" + shareNo, "GET").then((resp) => {
  //     // setCalendar(resp.data);
  //     setShareNo(resp.data);
  //     console.log("shareNo는????", shareNo);
  //   });
  // }, []);

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
        // timeZoneRef.current =
        //   e.target.value + " (utc " + response.data.utc_offset + ")";
        const timeZone =
          e.target.value + " (utc " + response.data.utc_offset + ")";
        setTimeZone(timeZone);
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
            value={"color" || ""}
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
              color={colorRef.current}
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
                // value={name}
                onChange={handleNameChange}
                variant="outlined"
                rows={4}
              ></TextField>
            </Grid>
            <TextField
              style={{ width: "400px" }}
              id="outlined-required-com"
              label={t("Comment")}
              defaultValue={item.comment}
              onChange={handleCommentChange}
              variant="outlined"
              multiline
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
            >
              {timeZones.map((timeZone) => (
                <MenuItem value={timeZone}>{timeZone}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </div>

        <div style={{ textAlign: "center", margin: "20px" }}>
          <TextField
            style={{ width: "400px" }}
            id="outlined-basic"
            label={t("Share")}
            variant="outlined"
          />
        </div>
        <div style={{ textAlign: "left", margin: "20px" }}>
          <Button variant="outlined" onClick={openModal}>
            {t("Invite users")}
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
          <Button variant="text" onClick={copenModal}>
            {t("Unsubscribe from")}
          </Button>
          <UnsubscribeModal
            open={cmodalOpen}
            close={ccloseModal}
            calNo={calNo}
          />
          <Button variant="text" color="error" onClick={bopenModal}>
            {t("delete calendar")}
          </Button>
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
