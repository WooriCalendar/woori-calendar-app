import React, { useState } from "react";
import SettingNavigation from "./SettingNavigation";
import SettingSidebar from "./SettingSidebar";
import { Button, Grid } from "@mui/material";
import CalModify from "./CalModify";
import NicnameModal from "./NicnameModal";
import MyPage from "./MyPage";
import Category from "./Category";
import SettingPasword from "./SettingPasword";
import LanguageSelector from "./LanguageSelector";

const Settings = (props) => {
  console.log("밸류::::" + props.value);
  const [activeComponent, setActiveComponent] = useState("Settings");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showMyPage, setShowMyPage] = useState(false);
  const handleSidebarClick = (component) => {
    setActiveComponent(component);
    setSelectedComponent(component);
    console.log("asdasdasdasd00+", component);
  };

  const renderComponent = () => {
    if (activeComponent === "Settings") {
      return <LanguageSelector />;
    } else if (activeComponent === "SettingPasword") {
      return <SettingPasword setShowMyPage={setShowMyPage} />;
    } else if (
      activeComponent === "Category" ||
      activeComponent === "CalModify"
    ) {
      return <CalModify />;
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
