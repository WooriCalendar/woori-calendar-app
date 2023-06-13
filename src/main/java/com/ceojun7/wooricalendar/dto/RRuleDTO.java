package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

/**
 * @author : seolha86
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : RRuleDTO
 * @date : 2023-06-13
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-13        seolha86             최초 생성
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RRuleDTO {
    private Date dtstart;
    private Timestamp until;
    private String freq;

    public RRuleDTO(final ScheduleEntity entity) {
        this.dtstart = entity.getStartDate();
        this.until = entity.getReEndDate();
        this.freq = entity.getRePeriod();
    }
}
