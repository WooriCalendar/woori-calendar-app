package com.ceojun7.wooricalendar.dto;

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
    private Long sNo;
    private String name;
    private String comment;
    private Timestamp startTime;
    private Timestamp endTime;
    private Timestamp startDate;
    private Timestamp endDate;
    private Date regDate;
    private Date updateDate;
    private Long calNo;

    public ScheduleDTO(final ScheduleEntity entity) {
        this.sNo = entity.getSNo();
        this.name = entity.getName();
        this.comment = entity.getComment();
        this.startTime = entity.getStartTime();
        this.endTime = entity.getEndTime();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.regDate = entity.getRegDate();
        this.updateDate = entity.getRegDate();
        this.calNo = entity.getCalNo();
    }

    public static ScheduleEntity toEntity(final ScheduleDTO dto) {
        return ScheduleEntity.builder().sNo(dto.getSNo()).name(dto.getName()).comment(dto.getComment()).startTime(dto.getStartTime())
                .endTime(dto.getEndTime()).startDate(dto.getStartDate()).endDate(dto.getEndDate()).regDate(dto.getRegDate())
                .updateDate(dto.getUpdateDate()).calNo(dto.getCalNo()).build();
    }
}
