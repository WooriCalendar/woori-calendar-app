package com.ceojun7.wooricalendar.dto;

import java.util.Date;

import com.ceojun7.wooricalendar.model.GradeEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : GradeDTO.java
 * @author : 박현민
 * @date : 2023.06.01
 * @description : 권한 설정
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.01 박현민 최초 생성
 */

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GradeDTO {
    private Long gradeNo;
    private String name;
    private String grade;
    private Date regDate;
    private Date updateDate;

    // entity > dto
    public GradeDTO(final GradeEntity entity) {
        this.gradeNo = entity.getGradeNo();
        this.name = entity.getName();
        this.grade = entity.getGrade();
        this.regDate = entity.getRegDate();
        this.updateDate = entity.getUpdateDate();
    }

    // dto > entity
    public static GradeEntity toEntity(final GradeDTO dto) {
        return GradeEntity.builder()
                .gradeNo(dto.getGradeNo())
                .name(dto.getName())
                .grade(dto.getGrade())
                .regDate(dto.getRegDate())
                .updateDate(dto.getUpdateDate())
                .build();
    }
}
