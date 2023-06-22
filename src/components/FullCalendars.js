import React, {useEffect, useRef, useState} from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from '@fullcalendar/rrule'
import {call} from "../service/ApiService";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from '@fullcalendar/react'
import ShareModal from "./ShareModal";
import ScheduleModal from "./ScheduleModal"; // must go before plugins
import "../App.css"
import EventModal from "./EventModal";
import moment from 'moment';
import axios from "axios";

const FullCalendars = (
    {headerToolbar, height, aspectRatio, contentHeight, category, initialView}, props
) => {
    const [items, setItems] = useState([]);
    const scheduleRef = useRef([]);
    const [calendar, setCalendar] = useState([]);
    const [scheduleModal, setScheduleModal] = useState(false)
    const [eventModal, setEventModal] = useState(false);
    const [date, setDate] = useState('')
    const eventRef = useRef('');
    const dayOfWeekRef = useRef('');
    const calendarRef = React.useRef('dayGridMonth');

    useEffect(() => {
        call("/schedule", "GET", null)
            .then((response) => {
                setItems(response.data)
            });
        }, [category]
    )

    useEffect( () => {
        const { current: calendarDom } = calendarRef;
        const API = calendarDom ? calendarDom.getApi() : null;
        if (initialView) API && API.changeView(initialView);
    }, [initialView]);

    const openScheduleModal = () => {
        setScheduleModal(true)
    }

    const closeScheduleModal = () => {
        setScheduleModal(false);
    };

    const openEventModal = async () => {
        setEventModal(true)

        await call("/schedule/" + eventRef.current.extendedProps.scNo, "GET", null)
            .then((response) => {
                // console.log(response.data[0])
                scheduleRef.current = response.data[0]
            })

        getCalendar()
    }

    const getCalendar = async () => {
        await call("/calendar/" + scheduleRef.current.calNo, "GET")
            .then((response) => {
                setCalendar(response.data[0])
            })
    }

    const closeEventModal = () => {
        setEventModal(false)
    }

    /**
     * 이벤트 클릭시 발생 함수
     * @param eventInfo
     */
    const handleEventClick = (eventInfo) => {
        // alert(eventInfo.event._def.extendedProps)
        console.log('클릭한 이벤트:', eventInfo.event._def);
        eventRef.current = eventInfo.event._def
        openEventModal()
        // await call("/schedule/scNo", "GET", {scNo: eventInfo.extendedProps.scNo}).then((response) => {
        //     console.log(response)})
    };

    /**
     * @Author 함준혁
     * 날짜 클릭시 발생 함수
     * @param arg
     */
    const handleDateClick = (arg) => { // bind with an arrow function
        // alert(arg.dateStr)
        // console.log("클릭한 Date:", arg.dateStr);
        console.log(arg)
        dayOfWeekRef.current = arg.date;
        setDate(arg.dateStr)
        openScheduleModal()
    }

    // console.log("뷰 ", viewRef.current)

    /**
     * @Author 함준혁
     * 일정 추가
     * @type {[{date: string, title: string},{date: string, title: string}]}
     */
    // const startdate = '2023-05-31 00:00:00.000'

    const events = [
            ...items,
        // {
        //     title : "반복 테스트",
        //     start : '2023-06-15',
        //     color : '#222',
        //     rrule : {
        //         freq : "weekly",
        //         dtstart : '2023-06-15'
        //     },
        // }
    ];

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, momentPlugin, interactionPlugin, timeGridPlugin, rrulePlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={headerToolbar}
                events={events}
                height={height}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                contentHeight={contentHeight}
                aspectRatio={aspectRatio}
                ref={calendarRef}
            />

            <ScheduleModal
                open={scheduleModal}
                close={closeScheduleModal}
                date={date}
                events={events.filter((event) => (
                    (
                        event.rrule === null ?
                            (moment(event.start).format("yyyy-MM-DD") === moment(event.end).format("yyyy-MM-DD") ? event.start.includes(date) && event.end.includes(date) : event.start <= date && event.end > date)
                            :
                            event.start <= date && (event.rrule.freq === 'weekly' ? event.rrule.until >= date && moment(dayOfWeekRef.current).format("dddd").includes(event.dayOfWeek) : event.rrule.until >= date)
                    )
                ))}
            />

            <EventModal
                open={eventModal}
                close={closeEventModal}
                event={eventRef.current}
                schedule={scheduleRef.current}
                calendar={calendar}
            />
        </>
    )
}

export default FullCalendars