import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from "@fullcalendar/daygrid";

export default class FullCalendarWeek extends React.Component {
    render() {
        /**
         * 이벤트 클릭시 발생 함수
         * @param eventInfo
         */
        const handleEventClick = (eventInfo) => {
            console.log('클릭한 이벤트:', eventInfo.event);
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

        const events = [
            {
                sNo: '',
                title: '서라',
                comment: '테스트',
                startTime: '',
                endTime: '',
                date: startdate,
                endDate: '2023-05-31 00:00:00.000',
                regDate: '2023-05-31 20:41:22.000',
                updateDate: '2023-05-31 20:41:22.000',
                calNo: '1',
                place: ''
            },
            // 추가적인 이벤트 데이터...
        ];

        return (
            /**
             * FullCalendar Api 추가
             * 함준혁
             * 2023-05-31
             */
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridWeek"
                events={events}
                eventClick={handleEventClick}
                DateClick={handleDateClick}
            />
        )
    }
}

