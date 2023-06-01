package com.ceojun7.wooricalendar.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName    : com.ceojun7.wooricalendar.dto
 * @fileName       : GradeDTO.java
 * @author         : 박현민
 * @date           : 2023.06.01
 * @description    : 권한 설정
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.06.01        박현민           최초 생성
 */

 @Builder
 @NoArgsConstructor
 @AllArgsConstructor
 @Data
public class GradeDTO {
    private long gradeNo;
    private String name;
    private String grade;
    private Date regDate;
    private Date updatDate;
}
