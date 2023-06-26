import React, {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { call, fetchMemberData } from "../service/ApiService";
import axios from "axios";
import {Button} from "@mui/material";
import NewEventModal from "./NewEventModal";
import {faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';

import { useTranslation } from "react-i18next";
const EventModal = (props) => {
  const { open, close, event, schedule, calendar } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const openModal = (e) => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

    let regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

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

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <span>{schedule.title}</span>
            <button className="close" onClick={close}>
              <CloseIcon />
            </button>
          </header>
          <main>
            <Grid container style={{ marginBottom: "20px" }}>
                <AccessTimeIcon style={{marginRight : "10px"}}/>
                {
                    regex.test(schedule.start) ?
                        (
                            moment(schedule.end).format("DD") - moment(schedule.start).format("DD") === 1 ?
                                "종일" : moment(schedule.start).format("yyyy-MM-DD") + " - " + moment(schedule.end).format("yyyy-MM-DD")
                        ) :
                        moment(schedule.start).format("mm : ss") + " - " + moment(schedule.end).format("mm : ss")
                }
            </Grid>
              {
                  schedule.comment ? (
                      <Grid container style={{marginBottom: "20px"}}>
                          <SubjectIcon style={{marginRight : "10px"}}/>
                          {schedule.comment}
                      </Grid>
                  ) : ''
              }
              {
                  schedule.place ? (
                      <Grid container style={{marginBottom: "20px"}}>
                          <PlaceIcon style={{marginRight : "10px"}}/>
                          {schedule.place}
                      </Grid>
                  ) : ''
              }
            <Grid container style={{ marginBottom: "20px" }}>
                <EventIcon style={{marginRight : "10px"}}/>
              {calendar.name}
            </Grid>
            <Grid container style={{ marginBottom: "20px" }}>
              <Button color={"warning"} onClick={openModal}>
                {t("Modify")}
              </Button>
              <NewEventModal
                open={modalOpen}
                close={closeModal}
                calendar={calendar}
                scheduleDTO={schedule}
              />
            </Grid>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default EventModal;
