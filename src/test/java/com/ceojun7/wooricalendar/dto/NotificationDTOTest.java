package com.ceojun7.wooricalendar.dto;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : NotificationDTOTest
 * @date : 2023-06-13
 * @description : 알림 DTO 테스트
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-13        Hamdoson           최초 생성
 */
@SpringBootTest
@Slf4j
class NotificationDTOTest {
    private NotificationDTO notificationDTO;

    /**
     * methodName : testNotificationDTO
     * comment : DTO 생성 테스트
     * author : Hamdoson
     * date : 2023-06-13
     * description : DTO 생성 테스트
     */
    @Test
    public void testNotificationDTO() {

        notificationDTO = NotificationDTO
                .builder()
                .sendEmail("Jack")
                .revEmail("Doson")
                .comment("Hi")
                .type("Test")
                .calNo(1L)
                .build();

        //테스트
        log.info("::::: 생성된 데이터 :::::");
        log.info("sendEmail :: " + notificationDTO.getSendEmail());
        log.info("revEmail :: " + notificationDTO.getRevEmail());
        log.info("comment :: " + notificationDTO.getComment());
        log.info("type :: " + notificationDTO.getType());
        log.info("calNo :: " + notificationDTO.getCalNo());
    }
}
