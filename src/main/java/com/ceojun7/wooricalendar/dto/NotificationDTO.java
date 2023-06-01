package com.ceojun7.wooricalendar.dto;

import com.ceojun7.wooricalendar.model.NotificationEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * The type Notification dto.
 *
 * @author : HAMDOSON
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
     * NotificationDTO
     * comment : NotificationDTO생성자
     * author : Hamdoson
     * date : 2023-06-01
     * description : NotificationEntity 객체를 기반으로 NotificationDTO 객체를 생성하는 생성자
     *
     * @param entity the entity
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
     * methodName : toEntity
     * comment : toEntity 객체 생성
     * author : Hamdoson
     * date : 2023-06-01
     * description : NotificationDTO 객체를 기반으로 NotificationEntity 객체를 생성하는 정적 메서드
     * @param dto the dto
     * @return the notification entity
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
