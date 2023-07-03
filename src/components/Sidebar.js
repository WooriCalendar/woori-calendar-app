import "../css/Sidebar.css";
import FullCalendars from "./FullCalendars";
import Category from "./Category";
import { Button, Fab, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";
import { useTranslation } from "react-i18next";
import { fetchMemberData } from "../service/ApiService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";

const Sidebar = (
    { visible, aspectRatio, height, contentHeight, onCategoryChange },
    props
) => {
  const headerToolbar = {
    left: "",
    center: "",
    right: "",
  };

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

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
      <div>
        {visible && (
            <div className="slide-out">
              <BasicMenu />
              <FullCalendar
                  plugins={[dayGridPlugin, momentPlugin, interactionPlugin, timeGridPlugin, rrulePlugin]}
                  initialView={'dayGridMonth'}
                  headerToolbar={headerToolbar}
                  heigth={height}
                  contentHeight={contentHeight}
                  aspectRatio={aspectRatio}
              />
              <div style={{height : 300, overflow : 'scroll', marginTop : 10, marginBottom : 10}} >
                <Category onCategoryChange={onCategoryChange} />
              </div>
              <Typography variant="body2" color="textSecondary" align="center">
                Copyright &copy; Woori Calendar {new Date().getFullYear()}
              </Typography>
            </div>
        )}
      </div>
  );
};
export default Sidebar;