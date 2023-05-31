package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CalendarDTO {
    private Long calNo;
    private String name;
    private String comment;
    private String timeZone;
    private Date regDate;
    private Date updateDate;

    // entity > dto
    public CalendarDTO(final CalendarEntity entity) {
        this.calNo = entity.getCalNo();
        this.name = entity.getName();
        this.comment = entity.getComment();
        this.timeZone = entity.getTimeZone();
        this.regDate = entity.getRegDate();
        this.updateDate = entity.getUpdateDate();
    }

    // dto > entity
    public static CalendarEntity calDTOtoEntity(final CalendarDTO dto) {
        return CalendarEntity.builder().calNo(dto.getCalNo()).name(dto.getName()).comment(dto.getComment()).timeZone(dto.getTimeZone()).regDate(dto.getRegDate()).updateDate(dto.getUpdateDate()).build();
    }
}
