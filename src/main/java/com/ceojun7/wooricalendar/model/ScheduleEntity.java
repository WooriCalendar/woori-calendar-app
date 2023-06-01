package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.sql.Timestamp;

/**
 * @packageName    : com.ceojun7.wooricalendar.model
 * @fileName       : ScheduleEntity.java
 * @author         : 김설하
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         김설하           최초 생성
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_schedule")
public class ScheduleEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sNo;
    private String name;
    private String comment;

    private Timestamp startTime;
    private Timestamp endTime;
    private Timestamp startDate;
    private Timestamp endDate;
    private Date regDate;
    private Date updateDate;

    @ManyToOne
    @JoinColumn(name = "calNo")
    private CalendarEntity calendarEntity;
}
