package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import java.util.Date;

/**
 * @packageName    : com.ceojun7.wooricalendar.dto
 * @fileName       : CalendarDTO.java
 * @author         : seolha86
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         seolha86           최초 생성
 */

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
        this.timeZone = entity.getTimezone();
        this.regDate = entity.getRegdate();
        this.updateDate = entity.getUpdatedate();
    }

    // dto > entity
    public static CalendarEntity toEntity(final CalendarDTO dto) {
        return CalendarEntity.builder().calNo(dto.getCalNo()).name(dto.getName()).comment(dto.getComment()).timezone(dto.getTimeZone()).regdate(dto.getRegDate()).updatedate(dto.getUpdateDate()).build();
    }
}
