// import React, { useState, useEffect } from "react";
// import { Button, TextField } from "@mui/material";
// import { call } from "../service/ApiService";
// import { Grid } from "react-loader-spinner";

// const SettingPaswordModal = (props) => {
//   const { open, close } = props;
//   const [submail, setSubmail] = useState("");

//   const [email, setEmail] = useState([]);

//   useEffect(() => {
//     call("/member", "GET", null).then((resp) => {
//       setEmail(resp);
//       console.log("ssssssssssssss", resp);
//       console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
//     });
//   }, []);

//   // const editEventHandler = () => {
//   //   const updatedItem = {
//   //     ...email,
//   //     password: document.getElementById("password-a").value,
//   //   };
//   //   console.log("riprip", updatedItem);
//   // };

//   const [password, setPassword] = useState("");

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const editEventHandler = () => {
//     // 패스워드 검증 로직 추가
//     if (password === "올바른비밀번호") {
//       // 비밀번호가 일치하는 경우 MyPage 컴포넌트와 연결하는 처리
//       console.log("비밀번호 검증 통과");
//       // MyPage 컴포넌트와 연결하는 코드 작성
//       // 예시: <MyPage />
//     } else {
//       // 비밀번호가 일치하지 않는 경우에 대한 처리
//       console.log("비밀번호가 일치하지 않습니다.");
//     }
//   };

//   return (
//     // 모달이 열릴때 openModal 클래스가 생성된다.
//     <div className={open ? "openModal modal" : "modal"}>
//       {open ? (
//         <section>
//           <main>
//             {/* {email.map((item) => ( */}
//             <div style={{ textAlign: "center", marginBottom: "10px" }}>
//               <p>비밀번호 체크</p>
//             </div>
//             <div>
//               <form>
//                 <div style={{ marginBottom: "5px" }}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="password"
//                     name="password"
//                     type="password"
//                     label="password"
//                     autoComplete="password"
//                     style={{ marginBottom: "2%" }}
//                     onChange={handlePasswordChange}
//                   />
//                 </div>
//               </form>
//             </div>
//           </main>
//           <footer>
//             <Button
//               type="submit"
//               variant="contained"
//               className="invite"
//               style={{ marginRight: "10px" }}
//               onClick={editEventHandler}
//               // onChange={handlePasswordChange}
//             >
//               완료
//             </Button>
//             <Button variant="contained" onClick={close}>
//               취소
//             </Button>
//           </footer>
//         </section>
//       ) : null}
//     </div>
//   );
// };

// export default SettingPaswordModal;

// import React, { useState } from "react";
// import { Button, TextField } from "@mui/material";
// import { useHistory } from "react-router-dom";

// const SettingPaswordModal = (props) => {
//   const { open, close } = props;
//   const [password, setPassword] = useState("");

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const editEventHandler = () => {
//     // 패스워드 검증 로직 추가
//     if (password === "올바른비밀번호") {
//       console.log("비밀번호 검증 통과");
//       // 비밀번호가 일치하는 경우 MyPage 컴포넌트와 연결하는 처리
//       history.push("/MyPage"); // MyPage로 페이지 이동
//     } else {
//       console.log("비밀번호가 일치하지 않습니다.");
//     }
//   };

//   const history = useHistory();

//   return (
//     <div className={open ? "openModal modal" : "modal"}>
//       {open ? (
//         <section>
//           <main>
//             <div style={{ textAlign: "center", marginBottom: "10px" }}>
//               <p>비밀번호 체크</p>
//             </div>
//             <div>
//               <form>
//                 <div style={{ marginBottom: "5px" }}>
//                   <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="password"
//                     name="password"
//                     type="password"
//                     label="password"
//                     autoComplete="password"
//                     style={{ marginBottom: "2%" }}
//                     value={password}
//                     onChange={handlePasswordChange}
//                   />
//                 </div>
//               </form>
//             </div>
//           </main>
//           <footer>
//             <Button
//               type="submit"
//               variant="contained"
//               className="invite"
//               style={{ marginRight: "10px" }}
//               onClick={editEventHandler}
//             >
//               완료
//             </Button>
//             <Button variant="contained" onClick={close}>
//               취소
//             </Button>
//           </footer>
//         </section>
//       ) : null}
//     </div>
//   );
// };

// export default SettingPaswordModal;

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SettingPasswordModal = (props) => {
  const { open, close } = props;
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const editEventHandler = () => {
    // 패스워드 검증 로직 추가
    if (password === "올바른비밀번호") {
      console.log("비밀번호 검증 통과");
      navigate("/mypage");
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <p>비밀번호 체크</p>
            </div>
            <div>
              <form>
                <div style={{ marginBottom: "5px" }}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="password"
                    autoComplete="password"
                    style={{ marginBottom: "2%" }}
                    onChange={handlePasswordChange}
                  />
                </div>
              </form>
            </div>
          </main>
          <footer>
            <Button
              type="submit"
              variant="contained"
              className="invite"
              style={{ marginRight: "10px" }}
              onClick={editEventHandler}
            >
              완료
            </Button>
            <Button variant="contained" onClick={close}>
              취소
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default SettingPasswordModal;
