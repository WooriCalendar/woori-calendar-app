// import React, { useState, useEffect } from "react";
// import { Button, TextField } from "@mui/material";
// import { call, fetchMemberData } from "../service/ApiService";
// import moment from "moment";
// import { useTranslation } from "react-i18next";
// const BirthModal = (props) => {
//   const { open, close } = props;
//   const [birthday, setBirthday] = useState("");

//   const [email, setEmail] = useState([]);
//   const { t, i18n } = useTranslation();
//   const [language, setLanguage] = useState("");
//   // const [grade, setGrade] = useState("");
//   // const handleChange = (event) => {
//   //   setGrade(event.target.value);
//   // };

//   useEffect(() => {
//     call("/member", "GET", null).then((resp) => {
//       setEmail(resp);
//       i18n.changeLanguage(resp.language);
//     });
//     fetchMemberData();
//   }, [i18n]);

//   const editEventHandler = () => {
//     const updatedItem = {
//       ...email,
//       birthday: document.getElementById("birthday").value,
//     };
//     console.log("riprip", updatedItem);

//     call("/member", "PUT", updatedItem).then((resp) => {
//       console.log("rrrrrrrrrr::", resp);
//       close();
//     });
//   };

//   const handleNameChange = (e) => {
//     setBirthday(e.target.value);
//     console.log("0000000000000000", handleNameChange);
//   };

//   return (
//     // 모달이 열릴때 openModal 클래스가 생성된다.
//     <div className={open ? "openModal modal" : "modal"}>
//       {open ? (
//         <section>
//           <main>
//             {/* {email.map((item) => ( */}
//             <div style={{ marginBottom: "5px" }}>
//               <TextField
//                 // fullWidth
//                 id="birthday"
//                 label={t("birthday")}
//                 variant="outlined"
//                 defaultValue={moment(email.birthday).format("YYYY-MM-DD") || ""} //   {email.birthday}
//                 format ={"YYYY-MM-DD"}
//                 onChange={handleNameChange}
//               />
//             </div>
//             {/* ))} */}
//           </main>
//           <footer>
//             <Button
//               variant="contained"
//               className="invite"
//               style={{ marginRight: "10px" }}
//               onClick={editEventHandler}
//             >
//               {t("Complete")}
//             </Button>
//             <Button variant="contained" onClick={close}>
//               {t("Cancel")}
//             </Button>
//           </footer>
//         </section>
//       ) : null}
//     </div>
//   );
// };

// export default BirthModal;

// ======================================================================================================================

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call, fetchMemberData } from "../service/ApiService";
import moment from "moment";
import { useTranslation } from "react-i18next";

const BirthModal = (props) => {
  const { open, close } = props;
  const [birthday, setBirthday] = useState("");

  const [email, setEmail] = useState([]);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
      i18n.changeLanguage(resp.language);
      setBirthday(moment(resp.birthday).format("YYYY-MM-DD"));
    });
    fetchMemberData();
  }, [i18n]);

  const editEventHandler = () => {
    const updatedItem = {
      ...email,
      birthday: moment(birthday).format("YYYY-MM-DD"),
    };
    console.log("updatedItem:", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("response:", resp);
      close();
    });
  };

  const handleBirthdayChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // 숫자만 추출
    const formattedValue = numericValue
      .replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") // YYYYMMDD 형식을 YYYY-MM-DD로 변환
      .slice(0, 10); // 최대 길이 제한

    setBirthday(formattedValue);
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ marginBottom: "5px" }}>
              <TextField
                id="birthday"
                label={t("birthday")}
                variant="outlined"
                value={birthday}
                format={"YYYY-MM-DD"}
                onChange={handleBirthdayChange}
                inputProps={{ pattern: "\\d*", inputMode: "numeric" }} // 숫자만 입력 가능하도록 설정
              />
            </div>
          </main>
          <footer>
            <Button
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={editEventHandler}
            >
              {t("Complete")}
            </Button>
            <Button variant="contained" onClick={close}>
              {t("Cancel")}
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default BirthModal;

// ====================================================================================
