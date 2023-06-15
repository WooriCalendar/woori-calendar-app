package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @packageName    : com.ceojun7.wooricalendar.model
 * @fileName       : CalendarEntity.java
 * @author         : seolha86
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         seolha86           최초 생성
 * 2023.06.01         seolha86           @DynamicInsert 어노테이션 추가, @Column 어노테이션 추가 - default current_timestamp
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_calendar")
@DynamicInsert
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calNo;
    private String name;
    private String comment;
    private String color;
    private String timezone;
    private Date regdate;
    private Date updatedate;

    @OneToMany(mappedBy = "calendarEntity")
    private final List<ScheduleEntity> schedules = new ArrayList<>();

    @Override
    public String toString() {
        return "CalendarEntity{" +
                "calNo=" + calNo +
                ", name='" + name + '\'' +
                ", comment='" + comment + '\'' +
                ", color='" + color + '\'' +
                ", timezone='" + timezone + '\'' +
                ", regdate=" + regdate +
                ", updatedate=" + updatedate +
                ", 스케줄= " + schedules +
                '}';
    }
}
