package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.model
 * @fileName : NotificationEntity
 * @date : 2023-06-01
 * @description : 알림 Entity
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        함준혁             최초 생성
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "tbl_notification")
@DynamicInsert
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ntNo; //알림 번호
    private String sendEmail; //보낸 사람의 이메일
    private String revEmail; // 받는 사람의 이메일
    private String comment; // 알림의 내용
    private String type; // 알림의 타입 ex) accept(캘린더 공유 승락), schReg(일정 등록), notReg(알림 등록), invite(캘린더 초대)
    private Date sdate; // 알림 발송 시간
    private Date rdate; // 알림 수신 시간 ( 수신 시간으로 check 여부 판단 )
    @ManyToOne
    @JoinColumn(name = "calNo")
    private CalendarEntity calendarEntity;
}
