import React, {useEffect, useState} from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import {call} from "../service/ApiService";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from '@fullcalendar/react' // must go before plugins

const FullCalendars = (
    {headerToolbar, height, aspectRatio, contentHeight}
) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
            call("/schedule", "GET", null)
                .then((response) => {
                    console.log("일정가져와지나?")
                    console.log(response.data)
                    setItems(response.data)
                });
        }, []
    )
    /**
     * 이벤트 클릭시 발생 함수
     * @param eventInfo
     */
    const handleEventClick = (eventInfo) => {
        // alert(eventInfo.event._def.extendedProps)
        console.log('클릭한 이벤트:', eventInfo.event._def);
    };

    /**
     * @Author 함준혁
     * 날짜 클릭시 발생 함수
     * @param arg
     */
    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
        console.log("클릭한 Date:", arg.dateStr);
    }


    /**
     * @Author 함준혁
     * 일정 추가
     * @type {[{date: string, title: string},{date: string, title: string}]}
     */
    const startdate = '2023-05-31 00:00:00.000'

    const events = [...items];
    console.log(events)

    return (
            <FullCalendar
                plugins={[dayGridPlugin, momentPlugin, interactionPlugin, timeGridPlugin]}
                initialView='dayGridMonth'
                headerToolbar={headerToolbar}
                events={events}
                height={height}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                contentHeight={contentHeight}
                aspectRatio={aspectRatio}
            />
    )
}

export default FullCalendars