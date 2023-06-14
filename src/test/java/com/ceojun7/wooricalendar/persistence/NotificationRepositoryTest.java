package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


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
    NotificationEntity notificationEntity = new NotificationEntity();

    @DisplayName("리소스생성")
    @BeforeEach
    void setUp() {
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

        notificationRepository.save(notificationEntity);
    }

    @DisplayName("PK값을 이용한 알림단일조회")
    @Test
    void findByNtNo() {
        Long pkNo = notificationRepository.findByRevEmail(notificationEntity.getRevEmail()).get(0).getNtNo();
        log.info("가져온 pkNo :: " + pkNo);
        NotificationEntity entity = notificationRepository.findByNtNo(pkNo);
        log.info("::::: pkNo으로 조회한 데이터 :::::");
        log.info("sendEmail :: " + entity.getSendEmail());
        log.info("revEmail :: " + entity.getRevEmail());
        log.info("comment :: " + entity.getComment());
        log.info("type :: " + entity.getType());
        log.info("calNo :: " + entity.getCalendarEntity().getCalNo());

    }
    @DisplayName("회원 Email을 이용한 알림조회")
    @Test
    void findByRevEmail() {
        NotificationEntity entity = notificationRepository.findByRevEmail(notificationEntity.getRevEmail()).get(0);
        log.info("::::: RevEmail을 이용해 조회한 데이터 :::::");
        log.info("sendEmail :: " + entity.getSendEmail());
        log.info("revEmail :: " + entity.getRevEmail());
        log.info("comment :: " + entity.getComment());
        log.info("type :: " + entity.getType());
        log.info("calNo :: " + entity.getCalendarEntity().getCalNo());
    }
    @DisplayName("캘린더 번호를 이용한 캘린더조회")
    @Test
    void findByCalendarEntity_CalNo() {
        CalendarEntity calendarEntity = notificationRepository.findByCalendarEntity_CalNo(1L).get(0).getCalendarEntity();
        log.info("캘린더 번호 :: " + calendarEntity.getCalNo());
        log.info("캘린더 이름 :: " + calendarEntity.getName());
        log.info("캘린더 내용 :: " + calendarEntity.getComment());
        log.info("캘린더 시간대 :: " + calendarEntity.getTimezone());
        log.info("캘린더 등록일 :: " + calendarEntity.getRegdate());
        log.info("캘린더 업데이트일 :: " + calendarEntity.getUpdatedate());
    }
    @DisplayName("알림저장")
    @Test
    void save() {
        NotificationEntity notificationEntity1 = notificationRepository.findByRevEmail(notificationEntity.getRevEmail()).get(0);

        log.info("::::: 생성된 데이터 :::::");
        log.info("sendEmail :: " + notificationEntity1.getSendEmail());
        log.info("revEmail :: " + notificationEntity1.getRevEmail());
        log.info("comment :: " + notificationEntity1.getComment());
        log.info("type :: " + notificationEntity1.getType());
        log.info("calNo :: " + notificationEntity1.getCalendarEntity().getCalNo());

        log.info("::::: 생성할 데이터와 생성된 데이터 비교 ( 모두 true일 시 테스트 성공 )");
        log.info(String.valueOf(notificationEntity.getSendEmail().equals(notificationEntity1.getSendEmail())));
        log.info(String.valueOf(notificationEntity.getRevEmail().equals(notificationEntity1.getRevEmail())));
        log.info(String.valueOf(notificationEntity.getComment().equals(notificationEntity1.getComment())));
        log.info(String.valueOf(notificationEntity.getType().equals(notificationEntity1.getType())));
        log.info(String.valueOf(notificationEntity.getCalendarEntity().getCalNo().equals(notificationEntity1.getCalendarEntity().getCalNo())));
    }
    @DisplayName("알림 삭제")
    @Test
    void delete() {
        log.info("::::: 데이터 정리 :::::");
        notificationRepository.delete(notificationRepository.findByRevEmail(notificationEntity.getRevEmail()).get(0));
        log.info("::::: 테스트 종료 :::::");
    }

    @DisplayName("리소스 반환")
    @AfterEach
    void setOff(){
        delete();
    }
}