package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.NotificationEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author : 함준혁
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : NotificationDTO
 * @date : 2023-06-01
 * @description : 알림DTO
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        함준혁            최초 생성
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class NotificationDTO {
    private Long nNo; //알림 번호
    private String sendEmail; //보낸 사람의 이메일
    private String revEmail; // 받는 사람의 이메일
    private String comment; // 알림의 내용
    private String type; // 알림의 타입 ex) accept(캘린더 공유 승락), schReg(일정 등록), notReg(알림 등록), invite(캘린더 초대)
    private LocalDateTime sdate; // 알림 발송 시간
    private LocalDateTime rdate; // 알림 수신 시간 ( 수신 시간으로 check 여부 판단! )

    /**
     * @methodName    : NotificationDTO
     * @author        : 함준혁
     * @date          : 2023-06-01
     * TodoEntity 객체를 기반으로 TodoDTO 객체를 생성하는 생성자
     */
    public NotificationDTO(final NotificationEntity entity) {
        this.nNo = entity.getNNo();
        this.sendEmail = entity.getSendEmail();
        this.revEmail = entity.getRevEmail();
        this.comment = entity.getComment();
        this.type = entity.getType();
        this.sdate = entity.getSdate();
        this.rdate = entity.getRdate();
    }
    /**
     * @methodName    : toEntity
     * @author        : 함준혁
     * @date          : 2023-06-01
     * TodoDTO 객체를 기반으로 TodoEntity 객체를 생성하는 정적 메서드
     */
    public static NotificationEntity toEntity(final NotificationDTO dto) {
        return NotificationEntity.builder()
                .nNo(dto.getNNo())
                .sendEmail(dto.getSendEmail())
                .revEmail(dto.getRevEmail())
                .comment(dto.getComment())
                .type(dto.getType())
                .sdate(dto.getSdate())
                .rdate(dto.getRdate())
                .build();
    }
}
