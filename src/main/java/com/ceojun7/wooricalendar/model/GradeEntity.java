package com.ceojun7.wooricalendar.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName    : com.ceojun7.wooricalendar.model
 * @fileName       : GradeEntity.java
 * @author         : 박현민
 * @date           : 2023.06.01
 * @description    : 권한 설정
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.06.01        박현민           최초 생성
 */

 @Data
 @NoArgsConstructor
 @AllArgsConstructor
 @Entity
 @Builder
 @Table(name = "tbl_grade")
public class GradeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long gradeNo;
    private String name;
    private String grade;
    private Date regDate;
    private Date updatDate;
}
