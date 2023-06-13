package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
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
 * @description :
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
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationRepository.findByNtNo(1L).toString();
    }

    @Test
    void findByRevEmail() {
        notificationRepository.findByRevEmail("7ceojun@gmail.com");
    }

    @Test
    void findByCalendarEntity_CalNo() {
    }

    @Test
    void save() {

    }

    @Test
    void delete() {

    }
}