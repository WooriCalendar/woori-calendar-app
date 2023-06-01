import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default class FullCalendarApp extends React.Component {
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
        }

        /**
         * @Author 함준혁
         * 일정 추가
         * @type {[{date: string, title: string},{date: string, title: string}]}
         */
        const events = [
            { title: '이벤트 1', date: '2023-05-31' },
            { title: '이벤트 2', date: '2023-06-01' },
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
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
            />
        )
    }
}