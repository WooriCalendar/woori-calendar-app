package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.model
 * @fileName : RepeatEntity
 * @date : 2023-06-08
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-08        김설하             최초 생성
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_repeat")
@DynamicInsert
public class RepeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reNo;
    private Date endDate;
    private String rePeriod;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "scNo")
    private ScheduleEntity scheduleEntity;
}
