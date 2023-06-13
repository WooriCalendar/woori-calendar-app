package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import com.ceojun7.wooricalendar.model.ShareEntity;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * @author : seolha86
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : ScheduleServiceTests
 * @date : 2023-06-07
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-07        seolha86             최초 생성
 */

@SpringBootTest
@Slf4j
@Transactional
public class ScheduleServiceTests {
    @Autowired
    private ScheduleService scheduleService;

    @Test
    public void testRetrieve() {
        log.warn(scheduleService.retrieveByEmail("nhue630@gmail.com").toString());
        log.warn(String.valueOf(scheduleService.retrieveByEmail("nhue630@gmail.com").size()));
    }
}
