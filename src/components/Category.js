import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { call } from "../service/ApiService";
import { Link } from "react-router-dom";
import Calmodify from "./CalModify";
import Settings from "./Settings";

const Category = () => {
  const [calendar, setCalendar] = useState([]);
  /**
   * @Author K-설하
   * 회원 이메일을 통하여 캘린더 가져오기
   * */
  // useEffect(() => {
  //   call("/calendar", "GET", null).then((response) => {
  //     console.log("캘린더 데이터");
  //     setCalendar(response.data);
  //   });
  // }, []);
  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      setCalendar(response.data);
    });
  }, []);
  // const Settings = () => {
  //   const calNo = calendar.calNo; // 전달할 인자 값

  //   return <Link to={`/settings/${calNo}`}></Link>;
  // };
  // const handleClick = () => {
  // <Link to={<Settings />}></Link>;
  // setActiveComponent(component);
  // handleSidebarClick(component, calNo);
  // };

  return (
    // <div>
    //   {calendar.map((item) => (
    //     <div key={item.calNo}>
    //       <Link to={`/calendar/${item.calNo}`}>
    //         <FormControlLabel
    //           control={<Checkbox name={item.name} checked={true} />}
    //           label={item.name}
    //         />
    //       </Link>
    //     </div>
    //   ))}
    // </div>
    <div>
      {calendar.map((item) => (
        <Link to={"/settings"} itemCalNo={item.calNo}>
          <div key={item.calNo}>
            <FormControlLabel
              control={<Checkbox name={item.name} checked={true} />}
              value={item.calNo}
              label={item.name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
