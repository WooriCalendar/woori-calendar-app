import React, { useState, useEffect } from "react";
import { Grid, Button, FormControlLabel, Checkbox } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import { useTranslation } from "react-i18next";
const SettingSidebar = ({ handleSidebarClick }) => {
  const [activeComponent, setActiveComponent] = useState("Settings");
  // const { calNo } = useParams();
  const [calendar, setCalendar] = useState([]);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      console.log("333333333", response);

      setCalendar(response.data);
      // setCalNo(calNo);
      i18n.changeLanguage(response.language);
    });
    fetchMemberData();
  }, [i18n]);
  const handleClick = (component, calNo) => {
    setActiveComponent(component);
    handleSidebarClick(component, calNo);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ marginTop: "20px" }}>
        <Grid>
          <Button onClick={() => handleClick("Settings")}>
            {t("Settings")}
          </Button>
        </Grid>

        <Grid>
          <Button onClick={() => handleClick("SettingPasword")}>
            {t("My Page")}
          </Button>
        </Grid>
        <Grid>
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
