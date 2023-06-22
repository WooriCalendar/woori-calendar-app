import React, { useState, useEffect } from "react";
import { Grid, Button, FormControlLabel, Checkbox } from "@mui/material";
import SettingPasword from "./SettingPasword";
import Category from "./Category";
import { call } from "../service/ApiService";
import LanguageSelector from "./LanguageSelector";
import { useParams } from "react-router-dom";
import CalModify from "./CalModify";

const Test = ({ handleSidebarClick }) => {
  // const [calendar, setCalendar] = useState([]);
  // useEffect(() => {
  //   call("/calendar", "GET", null).then((response) => {
  //     console.log("캘린더 데이터");
  //     console.log("333333333", response);
  //     // if (response.data && response.data.length > 0) {
  //     //   setCalendar(response.data[0]);
  //     // }
  //     setCalendar(response.data);
  //   });
  // }, []);
  // return (
  //   <div>
  //     {calendar.map((item) => (
  //       <div key={item.calNo}>
  //         <FormControlLabel
  //           control={<Checkbox name={item.name} checked={true} />}
  //           label={item.name}
  //           onClick={() => {
  //             handleClick("Category");
  //           }}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );
};
const SettingSidebar = ({ handleSidebarClick }) => {
  const [activeComponent, setActiveComponent] = useState("Settings");
  // const { calNo } = useParams();
  const [calendar, setCalendar] = useState([]);
  // const [calNo, setCalNo] = useState("");

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      console.log("333333333", response);
      // if (response.data && response.data.length > 0) {
      //   setCalendar(response.data[0]);
      // }
      setCalendar(response.data);
      // setCalNo(calNo);
    });
  }, []);

  // return (
  //   <div>
  //     {calendar.map((item) => (
  //       <div key={item.calNo}>
  //         <FormControlLabel
  //           control={<Checkbox name={item.name} checked={true} />}
  //           label={item.name}
  //           onClick={() => {
  //             handleClick("Category");
  //           }}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );

  // useEffect(() => {
  //   call("/calendar/" + calNo, "GET", null).then((response) => {
  //     console.log("캘린더 데이터");
  //     console.log("333333333", response);
  //     setCalendar(response.data);
  //     // setCalendar(response.data);
  //   });
  // }, []);

  const handleClick = (component, calNo) => {
    setActiveComponent(component);
    handleSidebarClick(component, calNo);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ marginTop: "20px" }}>
        <Grid>
          <Button onClick={() => handleClick("Settings")}>Settings</Button>
        </Grid>
        {/* <Grid>
          <Button onClick={() => handleClick("MyPage")}>My Page</Button>
        </Grid> */}
        <Grid>
          <Button onClick={() => handleClick("SettingPasword")}>My Page</Button>
        </Grid>
        <Grid>
          {/* <Button onClick={() => handleClick("Category")}> */}
          {/* {calendar && calendar.name} */}
          {/* </Button> */}
          {/* <Category onClick={() => handleClick("Category")}>
            <Button
              // defaultValue={calendar.name}
              onClick={() => handleClick("Category")}
            ></Button>
          </Category> */}
          <div>
            {calendar.map((item) => (
              <div key={item.calNo}>
                <FormControlLabel
                  control={<Checkbox name={item.name} checked={true} />}
                  value={item.calNo}
                  label={item.name}
                  onClick={() => {
                    handleClick("Category", item.calNo);
                  }}
                />
                {console.log(item.calNo)}
              </div>
            ))}
          </div>
          {/* <Category type="Button" onClick={() => handleClick("Category")} /> */}
        </Grid>
      </div>
    </div>
  );
};

export default SettingSidebar;
