package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import com.ceojun7.wooricalendar.persistence.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : NotificationServiceTest
 * @date : 2023-06-13
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-13        Hamdoson           최초 생성
 */
@SpringBootTest
@Slf4j
class NotificationServiceTest {
    @Autowired
    NotificationService notificationService;

    NotificationEntity notificationEntity = new NotificationEntity();

    @DisplayName("리소스생성")
    @BeforeEach
    void setUp() {
        log.info("::::: SetUp 실행 :::::");
        notificationEntity = NotificationEntity
                .builder()
                .sendEmail("Jack")
                .revEmail("Doson")
                .comment("Hi")
                .type("Test")
                .calendarEntity(CalendarEntity.builder().calNo(1L).build())
                .build();

        log.info("::::: 생성할 데이터 준비 :::::");
        log.info("sendEmail :: " + notificationEntity.getSendEmail());
        log.info("revEmail :: " + notificationEntity.getRevEmail());
        log.info("comment :: " + notificationEntity.getComment());
        log.info("type :: " + notificationEntity.getType());
        log.info("calNo :: " + notificationEntity.getCalendarEntity().getCalNo());

        log.info("::::: 데이터 생성 :::::");
        notificationService.create(notificationEntity);

        log.info("::::: SetUp 종료 :::::");
    }

    @DisplayName("일정 생성")
    @Test
    void create() {
        log.info("::::: create 실행 :::::");
        NotificationEntity notificationEntity1 = notificationService.retrieve(notificationEntity.getRevEmail()).get(0);

        log.info("::::: 생성된 데이터 :::::");
        log.info("sendEmail :: " + notificationEntity1.getSendEmail());
        log.info("revEmail :: " + notificationEntity1.getRevEmail());
        log.info("comment :: " + notificationEntity1.getComment());
        log.info("type :: " + notificationEntity1.getType());
        log.info("calNo :: " + notificationEntity1.getCalendarEntity().getCalNo());

        log.info("::::: 생성할 데이터와 생성된 데이터 비교 ( 모두 true일 시 테스트 성공 )");
        log.info("sendEmail 일치여부 :: " + String.valueOf(notificationEntity.getSendEmail().equals(notificationEntity1.getSendEmail())));
        log.info("reVEmail 일치여부 :: " + String.valueOf(notificationEntity.getRevEmail().equals(notificationEntity1.getRevEmail())));
        log.info("comment 일치여부 :: " + String.valueOf(notificationEntity.getComment().equals(notificationEntity1.getComment())));
        log.info("type 일치여부 :: " + String.valueOf(notificationEntity.getType().equals(notificationEntity1.getType())));
        log.info("calNo 일치여부 :: " + String.valueOf(notificationEntity.getCalendarEntity().getCalNo().equals(notificationEntity1.getCalendarEntity().getCalNo())));
        log.info("::::: create 종료 :::::");
    }

    @DisplayName("이메일을 통한 알림 조회")
    @Test
    void retrieve() {
        log.info("::::: Retrieve 실행 :::::");
        NotificationEntity entity = notificationService.retrieve(notificationEntity.getRevEmail()).get(0);
        log.info("::::: RevEmail을 이용해 조회한 데이터 :::::");
        log.info("sendEmail :: " + entity.getSendEmail());
        log.info("revEmail :: " + entity.getRevEmail());
        log.info("comment :: " + entity.getComment());
        log.info("type :: " + entity.getType());
        log.info("calNo :: " + entity.getCalendarEntity().getCalNo());
        log.info("::::: Retrieve 종료 :::::");
    }

    @DisplayName("알림번호를 통한 알림 삭제")
    @Test
    void delete() {
        // delete 테스트 실행은 setOff에서 하기때문에 따로 테스트 필요 X
        log.info("::::: Delete 실행 :::::");
        notificationService.delete(notificationService.retrieve(notificationEntity.getRevEmail()).get(0));
        log.info("::::: Delete 로직 반환값 :::::");
        log.info("새 RevEmailList :: (하지만 단일테스트이므로 반환값 존재 X)" + notificationEntity.getRevEmail());
        log.info("::::: Delete 종료 :::::");
    }

    @DisplayName("리소스 반환")
    @AfterEach
    void setOff() {
        log.info("::::: 데이터 정리 :::::");
        delete();
        log.info("::::: 테스트 종료 :::::");
    }

}
