// import React, { useState, useEffect } from 'react';
// import { Client } from '@stomp/stompjs';
// import {useSelector} from "react-redux";
// const WebSocketComponent = () => {
//
//     const [webSocket, setWebSocket] = useState();
//
//     useEffect(() => {
//         const ws = new WebSocket("ws://localhost:8080/ws");
//         console.log("웹소켓연결성공")
//         ws.onmessage = (event) => {
//             console.log("Received message:", event.data);
//         };
//         setWebSocket(ws);
//         return () => ws.close();
//     }, []);
//
//     // UseEffect
//
//     const sendMessage = () => {
//         if (webSocket) {
//             webSocket.send("Hello from React!");
//         }
//     };
//
//     return (
//         <></>
//     );
// };
//
// export default WebSocketComponent;
