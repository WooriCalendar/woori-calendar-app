package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScheduleDTO {
    private Long scNo;
    private String name;
    private String comment;
    private String place;
    private Timestamp startTime;
    private Timestamp endTime;
    private Timestamp startDate;
    private Timestamp endDate;
    private Date regDate;
    private Date updateDate;
    private Long calNo;

    public ScheduleDTO(final ScheduleEntity entity) {
        this.scNo = entity.getScNo();
        this.name = entity.getName();
        this.comment = entity.getComment();
        this.place = entity.getPlace();
        this.startTime = entity.getStartTime();
        this.endTime = entity.getEndTime();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.regDate = entity.getRegDate();
        this.updateDate = entity.getRegDate();
        this.calNo = entity.getCalendarEntity().getCalNo();
    }

    public static ScheduleEntity toEntity(final ScheduleDTO dto) {
        return ScheduleEntity.builder().scNo(dto.getScNo()).name(dto.getName()).comment(dto.getComment()).place(dto.getPlace())
                .startTime(dto.getStartTime()).endTime(dto.getEndTime()).startDate(dto.getStartDate()).endDate(dto.getEndDate()).regDate(dto.getRegDate())
                .updateDate(dto.getUpdateDate()).calendarEntity(CalendarEntity.builder().calNo(dto.calNo).build()).build();
    }
}
