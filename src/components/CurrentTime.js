// import React, { useState, useEffect } from "react";
// import { call } from "../service/ApiService.js";

// const TimezoneSelector = ({ onChange }) => {
//   const timezones = [
//     { value: "", label: "- Select -" },
//     { value: "America/New_York", label: "US Eastern Time (ET)" },
//     { value: "America/Chicago", label: "US Central Time (CT)" },
//     { value: "America/Denver", label: "US Mountain Time (MT)" },
//     { value: "America/Los_Angeles", label: "US Pacific Time (PT)" },
//     { value: "America/Anchorage", label: "Alaska Time (AKT)" },
//     { value: "Pacific/Honolulu", label: "Hawaii Time (HST)" },
//     { value: "Asia/Seoul", label: "(GMT+09:00)한국 표준시-서울" },
//     { value: "Asia/Tokyo", label: "Japan Time (JST)" }, //추후 라벨에 gmt+몇인지 적을지말지
//   ];

//   const handleTimezoneChange = (event) => {
//     const selectedTimezone = event.target.value; // 선택한 시간대 값을 가져옴
//     onChange(selectedTimezone);
//   };

//   return (
//     <div>
//       <h2>시간대:</h2>
//       <select onChange={handleTimezoneChange}>
//         {timezones.map((timezone) => (
//           <option key={timezone.value} value={timezone.value}>
//             {timezone.label}
//             {/* 위에 timezones label 표시 */}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const CurrentTime = () => {
//   const [selectedTimezone, setSelectedTimezone] = useState(""); // 선택한 시간대
//   const [currentTime, setCurrentTime] = useState(""); // 현재시간
//   const [utcOffset, setUtcOffset] = useState(""); // offset상태
//   const [calendar, setCalendar] = useState({});

//   useEffect(() => {
//     const fetchTimeByTimezone = async (timezone) => {
//       try {
//         const response = await fetch(
//           `https://worldtimeapi.org/api/timezone/${timezone}`
//         ); // api 호출
//         const data = await response.json();
//         setCurrentTime(data.datetime.split("T")[1].substring(0, 5)); // currentTime 시간대만 잘라서 가져오기
//         setUtcOffset(data.utc_offset); // utcOffset 가져오기
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (selectedTimezone) {
//       fetchTimeByTimezone(selectedTimezone);
//     } // api 호출 하여  시간정보 가져오기
//   }, [selectedTimezone]);

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
//   const handleTimezoneChange = (timezone) => {
//     setSelectedTimezone(timezone); // 선택한 시간대 값을 상태로 설정
//     console.log("cal::::::::", timezone);
//   };
//   const handleUpdate = () => {
//     const updatedData = {
//       ...calendar,
//       timeZone: selectedTimezone,
//       // 하드코딩 테스트
//       // calNo: 52,
//       // name: "트레블-변경",
//       // comment: "블러",
//       // timeZone: "Asia/Tokyo",
//       // regDate: "2023-06-13T12:54:13.000+00:00",
//       // updateDate: "2023-06-13T12:54:13.000+00:00",
//     };
//     console.log("main::::", calendar);
//     console.log("up:::::::", updatedData);
//     console.log("se:::::::", selectedTimezone);

//     call("/calendar", "PUT", updatedData).then((response) => {
//       console.log("Response:", response);
//       console.log("타임존 업데이트 성공");
//     });
//   };

//   const handleClick = () => {
//     handleUpdate();
//   };

//   return (
//     <div>
//       <TimezoneSelector onChange={handleTimezoneChange} />

//       {selectedTimezone && (
//         <div>
//           <p>Selected Timezone: {selectedTimezone}</p>
//           <p>Current Time: {currentTime}</p>
//           <p>UTC Offset: GMT/UTC{utcOffset}</p>
//           <button onClick={handleClick}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// };
// export default CurrentTime;

import React, { useState, useEffect } from "react";
import { call } from "../service/ApiService.js";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const TimezoneSelector = ({ onChange }) => {
  const timezones = [
    { value: "America/New_York", label: "US Eastern Time (ET)" },
    { value: "America/Chicago", label: "US Central Time (CT)" },
    { value: "America/Denver", label: "US Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "US Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HST)" },
    { value: "Asia/Seoul", label: "(GMT+09:00)한국 표준시-서울" },
    { value: "Asia/Tokyo", label: "Japan Time (JST)" }, //추후 라벨에 gmt+몇인지 적을지말지
  ];

  const handleTimezoneChange = (event) => {
    const selectedTimezone = event.target.value; // 선택한 시간대 값을 가져옴
    onChange(selectedTimezone);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <FormControl style={{ width: "400px", textAlign: "left" }}>
        <InputLabel id="demo-simple-select-label">시간대</InputLabel>
        <Select
          id="outlined-select-currency"
          label="시간대"
          defaultValue="Asia/Seoul"
          onChange={handleTimezoneChange}
        >
          {timezones.map((timezone) => (
            <MenuItem key={timezone.value} value={timezone.value}>
              {timezone.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

    // ======================================================================================
    // 2
    // <div style={{ textAlign: "center", margin: "20px" }}>
    //   <FormControl style={{ width: "400px", textAlign: "left" }}>
    //     <InputLabel id="demo-simple-select-label">시간대</InputLabel>
    //     <Select id="outlined-select-currency" label="시간대" defaultValue="0">
    //       <MenuItem value={0}> - Select - </MenuItem>
    //       <MenuItem value="Asia/Seoul">(GMT+09:00) 한국 표준시 - 서울</MenuItem>
    //       <MenuItem value={1}>
    //         (GMT-07:00) 미 태평양 시간 - 로스앤젤레스
    //       </MenuItem>
    //       <MenuItem value={2}>(GMT+05:00) 몰디브 시간</MenuItem>
    //     </Select>
    //   </FormControl>
    // </div>
    // ========================================================================================
    // 1
    // <div>
    //   <h2>시간대:</h2>
    //   <select onChange={handleTimezoneChange}>
    //     {timezones.map((timezone) => (
    //       <option key={timezone.value} value={timezone.value}>
    //         {timezone.label}
    //         {/* 위에 timezones label 표시 */}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};

const CurrentTime = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(""); // 선택한 시간대
  const [currentTime, setCurrentTime] = useState(""); // 현재시간
  const [utcOffset, setUtcOffset] = useState(""); // offset상태
  const [calendar, setCalendar] = useState({});

  useEffect(() => {
    const fetchTimeByTimezone = async (timezone) => {
      try {
        const response = await fetch(
          `https://worldtimeapi.org/api/timezone/${timezone}`
        ); // api 호출
        const data = await response.json();
        setCurrentTime(data.datetime.split("T")[1].substring(0, 5)); // currentTime 시간대만 잘라서 가져오기
        setUtcOffset(data.utc_offset); // utcOffset 가져오기
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedTimezone) {
      fetchTimeByTimezone(selectedTimezone);
    } // api 호출 하여  시간정보 가져오기
  }, [selectedTimezone]);

  useEffect(() => {
    call("/calendar", "GET", null).then((response) => {
      console.log("캘린더 데이터");
      setCalendar(...response.data);
      console.log("ti::::::", ...response.data);
      console.log("iti::::::", response);
      console.log("uuu::::::", response.timeZone);
      console.log(response);
    });
  }, []);
  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone); // 선택한 시간대 값을 상태로 설정
    console.log("cal::::::::", timezone);
  };
  const handleUpdate = () => {
    const updatedData = {
      ...calendar,
      timeZone: selectedTimezone,
      // 하드코딩 테스트
      // calNo: 52,
      // name: "트레블-변경",
      // comment: "블러",
      // timeZone: "Asia/Tokyo",
      // regDate: "2023-06-13T12:54:13.000+00:00",
      // updateDate: "2023-06-13T12:54:13.000+00:00",
    };
    console.log("main::::", calendar);
    console.log("up:::::::", updatedData);
    console.log("se:::::::", selectedTimezone);

    call("/calendar", "PUT", updatedData).then((response) => {
      console.log("Response:", response);
      console.log("타임존 업데이트 성공");
    });
  };

  const handleClick = () => {
    handleUpdate();
  };

  return (
    <div>
      <TimezoneSelector onChange={handleTimezoneChange} />

      {selectedTimezone && (
        <div style={{ textAlign: "right", margin: "20px" }}>
          <Button variant="contained" onClick={handleClick}>
            완료
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurrentTime;
