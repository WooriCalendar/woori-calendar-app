// import { Button, Grid, TextField } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { call } from "../service/ApiService.js";

// const NicnameModal = (props) => {
//   const { open, close } = props;
//   const [email, setEmail] = useState("");
//   const [member, setMember] = useState("");
//   const [comment, setComment] = useState("");
//   const [all, setAll] = useState("");
//   // const [email, setEmail] = useState("");

//   // const email = localStorage.getItem("email")

//   // const upDateEmail = {
//   //   email,
//   // };
//   // console.log("fist::::", email);

//   useState(() => {
//     call("/member", "GET", null).then((response) => {
//       // setAll(...response);
//       setMember(response.data);
//       console.log("last::::", response);
//     });
//   }, []);

//   const editEventHandler = () => {
//     const updatedItem = {
//       ...all,
//     };
//     call("/member", "PUT", updatedItem).then((response) => {});
//   };

//   const handleNameChange = (e) => {
//     setEmail(e.target.value);
//   };

//   return (
//     <div>
//       <div>
//         <h2>머리</h2>
//       </div>
//       <div className={open ? "openModal modal" : "modal"}>
//         {open ? (
//           <div>
//             {member.map((item) => (
//               <TextField
//                 style={{ width: "400px" }}
//                 id="outlined-required-name"
//                 label="이름"
//                 defaultValue={item.name}
//                 onChange={handleNameChange}
//                 variant="outlined"
//               ></TextField>
//             ))}
//             <footer>
//               <Button variant="contained" onClick={editEventHandler}>
//                 완료
//               </Button>
//               <Button variant="contained" onClick={close}>
//                 취소
//               </Button>
//             </footer>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default NicnameModal;

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import { Mail } from "@mui/icons-material";

const NicnameModal = (props) => {
  const { open, close } = props;
  const [nickname, setNickName] = useState("");

  const [email, setEmail] = useState([]);

  // const [grade, setGrade] = useState("");
  // const handleChange = (event) => {
  //   setGrade(event.target.value);
  // };

  useEffect(() => {
    call("/member", "GET", null).then((resp) => {
      setEmail(resp);
      console.log("ssssssssssssss", resp);
      console.log("eeeeeeeeeeeeeeeeeeeee", resp.nickname);
    });
  }, []);

  const editEventHandler = () => {
    const updatedItem = {
      ...email,
      nickname: document.getElementById("standard-basic").value,
    };
    console.log("riprip", updatedItem);

    call("/member", "PUT", updatedItem).then((resp) => {
      console.log("rrrrrrrrrr::", resp);
    });
  };

  const handleNameChange = (e) => {
    setNickName(e.target.value);
    console.log("0000000000000000", handleNameChange);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            {/* {email.map((item) => ( */}
            <div style={{ marginBottom: "5px" }}>
              <TextField
                // fullWidth
                id="standard-basic"
                label="닉네임"
                variant="outlined"
                defaultValue={email.nickname}
                onChange={handleNameChange}
              />
            </div>
            {/* ))} */}
          </main>
          <footer>
            <Button
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

export default NicnameModal;
