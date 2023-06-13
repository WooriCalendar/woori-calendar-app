package com.ceojun7.wooricalendar.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

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
        //필드 설정

        // Postman 참고
        // "sendEmail": "kang@gmail.com",
        //  "revEmail": "nhue630@gmail.com",
        //  "comment": "알림발송 Test",
        //  "type": "test",
        //  "calNo": "3"

        notificationDTO = NotificationDTO
                .builder()
                .sendEmail("Jack")
                .revEmail("Doson")
                .comment("Hi")
                .type("Test")
                .calNo(1L)
                .build();

        //테스트
        assertEquals("Jack", notificationDTO.getSendEmail());
        assertEquals("Doson", notificationDTO.getRevEmail());
        assertEquals("Hi", notificationDTO.getComment());
        assertEquals("Test", notificationDTO.getType());
        assertEquals(1L, notificationDTO.getCalNo());
    }
}