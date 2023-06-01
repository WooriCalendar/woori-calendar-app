package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

/**
 * @packageName    : com.ceojun7.wooricalendar.model
 * @fileName       : CalendarEntity.java
 * @author         : 김설하
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         김설하           최초 생성
 * 2023.06.01         김설하           @DynamicInsert 어노테이션 추가, @Column 어노테이션 추가 - default current_timestamp
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_calendar")
@DynamicInsert
public class CalendarEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calNo;
    private String name;
    private String comment;
    private String timezone;
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date regdate;
    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date updatedate;
}
