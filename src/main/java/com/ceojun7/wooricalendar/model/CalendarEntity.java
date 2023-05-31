package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_calendar")
public class CalendarEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calNo;
    private String name;
    private String comment;
    private String timeZone;
    private Date regDate;
    private Date updateDate;
}
