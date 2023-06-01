package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @packageName    : com.ceojun7.wooricalendar.service
 * @fileName       : CalendarService.java
 * @author         : 김설하
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         김설하           최초 생성
 */

@Service
@Slf4j
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    /**
     * methodName : create
     * comment : 새 calendar 생성
     * author : seolha86
     * date : 2023-06-01
     * description :
     *
     * @param calendarEntity the calendar entity
     * @return the list
     */
    public List<CalendarEntity> create(final CalendarEntity calendarEntity) {
        calendarRepository.save(calendarEntity);
        return calendarRepository.findByName(calendarEntity.getName());
    }

    public List<CalendarEntity> retrieve(Long calNo) {
        return calendarRepository.findByCalNo(calNo);
    };
}
