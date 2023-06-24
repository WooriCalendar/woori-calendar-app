import React, { useState, useEffect } from "react";
import SettingNavigation from "./SettingNavigation";
import SettingSidebar from "./SettingSidebar";
import { Button, Grid } from "@mui/material";
import CalModify from "./CalModify";
import NicnameModal from "./NicnameModal";
import MyPage from "./MyPage";
import Category from "./Category";
import SettingPasword from "./SettingPasword";
import LanguageSelector from "./LanguageSelector";
import { call } from "../service/ApiService";

const Settings = (itemCalNo) => {
  const [calendar, setCalendar] = useState([]);
  const [calNo, setCalNo] = useState([]);

  const [test, setTest] = useState([]);
  // console.log("밸류::::" + props.value);
  const [activeComponent, setActiveComponent] = useState("Settings");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showMyPage, setShowMyPage] = useState(false);
  const handleSidebarClick = (component, calNo) => {
    setActiveComponent(component);
    setSelectedComponent(component);
    setCalNo(calNo);
    console.log("asdasdasdasd00+", component);
  };

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      // console.log("11133333333311", response);
      console.log("11133333333311", response.data);
      setCalendar(response.data);
      // setCalendar(response.data);
    });
  }, []);
  console.log(calendar.calNo);
  // useEffect(() => {
  //   call("/calendar/" + calendar.calNo, "GET", null).then((response) => {
  //     console.log("캘린더 데이터");
  //     console.log("11133333333311", response);
  //     setTest(response.data);
  //     // setCalendar(response.data);
  //   });
  // }, []);
  // if (itemCalNo !== null) {
  //   setCalNo(itemCalNo);
  //   setActiveComponent("Category");
  // }
  const renderComponent = () => {
    if (activeComponent === "Settings") {
      return <LanguageSelector />;
    } else if (activeComponent === "SettingPasword") {
      return <SettingPasword setShowMyPage={setShowMyPage} />;
    } else if (
      activeComponent === "Category"
      // ||
      // activeComponent === "CalModify"
    ) {
      // return <CalModify calNo={calendar.calNo} />;
      return <CalModify calNo={calNo} />;
    }

    return null;
  };

  return (
    <div>
      <Grid container item xs={12}>
        <SettingNavigation selectedCategory={selectedComponent} />
        {/* {console.log("888888888888888888888", selectedComponent)} */}
        <Grid item xs={2}>
          <SettingSidebar handleSidebarClick={handleSidebarClick} />
          {/* {console.log("888988888", handleSidebarClick)} */}
        </Grid>
        <Grid style={{ margin: "30px" }} item xs={9}>
          <Grid container item xs={12}>
            <Grid style={{ margin: "30px" }} item xs={9}>
              {renderComponent()}
              {showMyPage && <MyPage />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

// import React, { useState } from "react";
// import SettingNavigation from "./SettingNavigation";
// import SettingSidebar from "./SettingSidebar";
// import { Button, Grid } from "@mui/material";
// import CalModify from "./CalModify";
// import NicnameModal from "./NicnameModal";
// import MyPage from "./MyPage";
// import Category from "./Category";
// import SettingPassword from "./SettingPasword";

// const Settings = () => {
//   const [activeComponent, setActiveComponent] = useState(null);
//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [showMyPage, setShowMyPage] = useState(false);

//   const handleSidebarClick = (component) => {
//     setActiveComponent(component);
//     setSelectedComponent(component);
//   };

//   const renderComponent = () => {
//     if (activeComponent === "SettingPassword") {
//       return (
//         <>
//           <SettingPassword setShowMyPage={setShowMyPage} />
//           {showMyPage && <MyPage />}
//         </>
//       );
//     } else if (activeComponent === "Category") {
//       return <Category />;
//     } else if (activeComponent === "CalModify") {
//       return <CalModify />;
//     }
//     return null;
//   };

//   return (
//     <div>
//       <Grid container item xs={12}>
//         <SettingNavigation selectedCategory={selectedComponent} />
//         <Grid item xs={2}>
//           <SettingSidebar handleSidebarClick={handleSidebarClick} />
//         </Grid>
//         <Grid style={{ margin: "30px" }} item xs={9}>
//           <Grid container item xs={12}>
//             <Grid style={{ margin: "30px" }} item xs={9}>
//               {renderComponent()}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Settings;
