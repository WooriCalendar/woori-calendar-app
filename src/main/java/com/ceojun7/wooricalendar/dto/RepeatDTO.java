package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.RepeatEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : RepeatDTO
 * @date : 2023-06-08
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-08        김설하             최초 생성
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RepeatDTO {
    private Date endDate;
    private String rePeriod;
    private Long scNo;

    public RepeatDTO(final RepeatEntity entity) {
        this.endDate = entity.getEndDate();
        this.rePeriod = entity.getRePeriod();
        this.scNo = entity.getScheduleEntity().getScNo();
    }

    public static RepeatEntity toEntity(final RepeatDTO dto) {
        return RepeatEntity.builder().endDate(dto.getEndDate()).rePeriod(dto.getRePeriod()).scheduleEntity(ScheduleEntity.builder().scNo(dto.getScNo()).build()).build();
    }
}
