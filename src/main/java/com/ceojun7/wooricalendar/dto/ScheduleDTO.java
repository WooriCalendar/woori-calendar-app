package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
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
        return ScheduleEntity.builder().scNo(dto.getScNo()).name(dto.getTitle()).comment(dto.getComment()).place(dto.getPlace())
//                .startTime(dto.getStartTime()).endTime(dto.getEndTime())
                .startDate(Timestamp.valueOf(dto.getStart())).endDate(Timestamp.valueOf(dto.getEnd()))
//                .regDate(dto.getRegDate()).updateDate(dto.getUpdateDate())
                .calendarEntity(CalendarEntity.builder().calNo(dto.calNo).build()).reEndDate(dto.rrule.getUntil()).rePeriod(dto.getRrule().getFreq()).build();
    }
}
