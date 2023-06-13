package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : NotificationRepositoryTest
 * @date : 2023-06-13
 * @description : 리파지토리 테스트
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-13        Hamdoson           최초 생성
 */
@SpringBootTest
@Slf4j
class NotificationRepositoryTest {
    @Autowired
    private NotificationRepository notificationRepository;

    @DisplayName("PK값을 이용한 단일조회")
    @Test
    void findByNtNo() {
        NotificationEntity entity = new NotificationEntity();
        entity = notificationRepository.findByNtNo(1L);

        log.info(String.valueOf(entity));

    }
    @DisplayName("회원 Email을 이용한 알림조회")
    @Test
    void findByRevEmail() {
        notificationRepository.findByRevEmail("7ceojun@gmail.com");
    }
    @DisplayName("캘린더 번호를 이용한 캘린더조회")
    @Test
    void findByCalendarEntity_CalNo() {
        notificationRepository.findByCalendarEntity_CalNo(1L);
    }
    @DisplayName("알림저장")
    @Test
    void save() {
        NotificationEntity notificationEntity = NotificationEntity
                .builder()
                .sendEmail("Jack")
                .revEmail("Doson")
                .comment("Hi")
                .type("Test")
                .calendarEntity(CalendarEntity.builder().calNo(1L).build())
                .build();

        notificationRepository.save(notificationEntity);
    }
    @DisplayName("알림 삭제")
    @Test
    void delete() {
        NotificationEntity notificationEntity = NotificationEntity
                .builder()
                .sendEmail("Jack")
                .revEmail("Doson")
                .comment("Hi")
                .type("Test")
                .calendarEntity(CalendarEntity.builder().calNo(1L).build())
                .build();

        notificationRepository.delete(notificationEntity);
    }
}