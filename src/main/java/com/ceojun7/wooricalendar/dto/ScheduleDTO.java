package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @author : seolha86
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : ScheduleDTO
 * @date : 2023-05-31
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-05-31       seolha86             최초 생성
 * 2023-06-12       seolha86             start, end 수정
 * 2023-06-13       seolha86             rrule 추가
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Slf4j
public class ScheduleDTO {
    private Long scNo;
    private String title;
    private String comment;
    private String place;
//    private Timestamp startTime;
//    private Timestamp endTime;
    private String  start;
    private String end;
    private Date regDate;
    private Date updateDate;
    private Long calNo;

    private RRuleDTO rrule;

    private boolean status;

//    public ScheduleDTO(Long scNo, String title, String comment, String place, String start, String end, Date regDate, Date updateDate, Long calNo) {
//        this.scNo = scNo;
//        this.title = title;
//        this.comment = comment;
//        this.place = place;
//        this.start = start;
//        this.end = end;
//        this.regDate = regDate;
//        this.updateDate = updateDate;
//        this.calNo = calNo;
//    }

    public ScheduleDTO(final ScheduleEntity entity) {
        this.scNo = entity.getScNo();
        this.title = entity.getName();
        this.comment = entity.getComment();
        this.place = entity.getPlace();

        if (entity.getStartTime() == null && entity.getEndTime() == null) {
            SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");

            this.start = dtFormat.format(entity.getStartDate());
            this.end = dtFormat.format(entity.getEndDate());
        } else {
            this.start = String.valueOf(entity.getStartTime());
            this.end = String.valueOf(entity.getEndTime());
        }

//        this.regDate = entity.getRegDate();
//        this.updateDate = entity.getRegDate();
        this.calNo = entity.getCalendarEntity().getCalNo();

        if (entity.getRePeriod() != null) {
            this.rrule = new RRuleDTO(entity);
        }
    }

    public static ScheduleEntity toEntity(final ScheduleDTO dto) {
        if (!dto.status) {
            return ScheduleEntity.builder().scNo(dto.getScNo()).name(dto.getTitle()).comment(dto.getComment()).place(dto.getPlace())
                    .startDate(Timestamp.valueOf(dto.getStart() + " 00:00:00")).endDate(Timestamp.valueOf(dto.getEnd() + " 00:00:00"))
                    .calendarEntity(CalendarEntity.builder().calNo(dto.getCalNo()).build()).reEndDate(dto.getRrule().getUntil()).rePeriod(dto.getRrule().getFreq()).build();
        } else {
            return ScheduleEntity.builder().scNo(dto.getScNo()).name(dto.getTitle()).comment(dto.getComment()).place(dto.getPlace())
                    .startTime(Timestamp.valueOf(dto.getStart())).endTime(Timestamp.valueOf(dto.getEnd()))
                    .calendarEntity(CalendarEntity.builder().calNo(dto.calNo).build()).reEndDate(dto.rrule.getUntil()).rePeriod(dto.getRrule().getFreq()).build();
        }
    }
}
