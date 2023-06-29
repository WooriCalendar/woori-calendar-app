import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import {useSelector} from "react-redux";
const WebSocketComponent = () => {
    // const [client, setClient] = useState(null);

    const [webSocket, setWebSocket] = useState();
    const [notification, setNotification] = useState;

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/ws");
        ws.onmessage = (event) => {
            console.log("Received message:", event.data);
        };
        setWebSocket(ws);
        return () => ws.close();
    }, []);

    // UseEffect

    const sendMessage = () => {
        if (webSocket) {
            webSocket.send("Hello from React!");
            webSocket.send(notification);
        }
    };

    return (
        <></>
    );
};

export default WebSocketComponent;
