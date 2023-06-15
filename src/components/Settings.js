// import { Button, Container, Grid } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { call } from "../service/ApiService.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const BackButton = () => {
//   const navigate = useNavigate();
//   const onClickBtn = () => {
//     navigate(-1);
//   };
//   return (
//     <FontAwesomeIcon
//       onClick={onClickBtn}
//       icon={faAngleLeft}
//       size="2xl"
//       style={{ color: "#d2d8e0" }}
//     />
//   );
// };

// const Settings = () => {
//   const [calendar, setCalendar] = useState();
//   const [userData, setUserData] = useState(null);
//   const [email, setEmail] = useState("");
//   useEffect(() => {
//     call("/calendar", "GET", null).then((response) => {
//       console.log("캘린더 데이터");
//       setCalendar(...response.data);
//       console.log("ti::::::", ...response.data);
//       console.log("iti::::::", response);
//       console.log("uuu::::::", response.timeZone);
//       console.log(response);
//     });
//   }, []);
//   useEffect(() => {
//     const token = localStorage.getItem("ACCESS_TOKEN"); // 토큰을 로컬 스토리지에서 가져옵니다.
//     if (token) {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       console.log("asd::::", token);
//       call("/member/profile", "GET", null, headers)
//         .then((response) => {
//           setEmail(response.email);
//           setUserData(response);
//           console.log("qqqq::::::", response);
//           console.log("wwwwwww::::::", response.email);
//         })
//         .catch((error) => {
//           console.error("데이터 가져오기 오류:", error);
//         });
//     }
//   }, []);
//   const upDateEmail = {
//     email,
//   };
//   console.log("fist::::", email);

//   useEffect(() => {
//     call("/member/" + upDateEmail, "GET", null)
//       .then((response) => {
//         setUserData(response);
//         console.log("last::::", response);
//       })
//       .catch((error) => {
//         console.error("데이터 가져오기 오류:", error);
//       });
//   }, []);

//   return (
//     <Container maxWidth="xs" style={{ marginTop: "8%", marginBottom: "10%" }}>
//       <Grid
//         container
//         item
//         xs={12}
//         style={{ marginTop: "3%", marginBottom: "3%" }}
//         spacing={2}
//       >
//         <Grid item xs={4} textAlign={"left"}>
//           <BackButton />
//         </Grid>

//         <Grid item xs={4} textAlign={"center"}>
//           설정
//         </Grid>
//         <Grid item xs={4} textAlign={"right"}>
//           <Button variant="contained">완료</Button>
//         </Grid>
//       </Grid>
//       <hr
//         style={{
//           border: "1px solid black",
//           marginTop: "3%",
//           marginBottom: "3%",
//         }}
//       />
//       <Grid style={{ marginTop: "3%", marginBottom: "3%" }}>언어</Grid>
//       <Grid>
//         <Link to="/MyPage" style={{ marginTop: "3%", marginBottom: "50%" }}>
//           내정보
//         </Link>
//       </Grid>
//     </Container>
//   );
// };

// export default Settings;

import React from "react";
import SettingNavigation from "./SettingNavigation";
import SettingSidebar from "./SettingSidebar";
import { Grid } from "@mui/material";
import CalModify from "./CalModify";

const Settings = () => {
  return (
    <div>
      <Grid
        container
        // spacing={3}
        xs={12}
        style={
          {
            // margin: "0px 0px",
            // justifyContent: "space-between",
            // width: "auto",
          }
        }
      >
        <SettingNavigation />
        <Grid item xs={2}>
          <SettingSidebar contentHeight={"410px"} aspectRatio={"2"} />
        </Grid>
        <Grid style={{ margin: "30px" }} xs={9}>
          <CalModify />
          <Grid>
            {/* 안녕하세요 의원을 제명하려면 국회재적의원 3분의 2 이상의 찬성이
            있어야 한다. 국가는 법률이 정하는 바에 의하여 재외국민을 보호할
            의무를 진다. 대통령은 전시·사변 또는 이에 준하는 국가비상사태에
            있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할
            필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.
            농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한
            사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에
            의하여 인정된다. 국민경제의 발전을 위한 중요정책의 수립에 관하여
            대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다.
            연소자의 근로는 특별한 보호를 받는다. 국회는 상호원조 또는
            안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약,
            주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적
            부담을 지우는 조약 또는 입법사항에 관한 조약의 체결·비준에 대한
            동의권을 가진다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에
            의하여 대법관이 아닌 법관을 둘 수 있다. 공무원은 국민전체에 대한
            봉사자이며, 국민에 대하여 책임을 진다. 국회는 헌법 또는 법률에
            특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의
            찬성으로 의결한다. 가부동수인 때에는 부결된 것으로 본다. 국회의원과
            정부는 법률안을 제출할 수 있다. 국회의원은 국가이익을 우선하여
            양심에 따라 직무를 행한다. 제1항의 지시를 받은 당해 행정기관은 이에
            응하여야 한다. 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는
            공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며,
            제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다. */}
          </Grid>
          <Grid>안녕하세요</Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
