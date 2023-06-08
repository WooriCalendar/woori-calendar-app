package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

/**
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName    : CalendarService.java
 * @author      : 김설하, 강태수
 * @date        : 2023.05.31
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.05.31 김설하 최초 생성
 *              2023.05.31 김설하 create 기능추가
 *              2023.06.01 강태수 update 기능추가
 *              2023.06.01 강태수 delete 기능추가
 */
@Service
@Slf4j
@Transactional
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

    public List<CalendarEntity> delete(final CalendarEntity entity) {

        calendarRepository.delete(entity);

        return calendarRepository.findByCalNo(entity.getCalNo());
    }

    public List<CalendarEntity> update(final CalendarEntity entity) {

        final List<CalendarEntity> originalList = calendarRepository.findByCalNo(entity.getCalNo());
        if (!originalList.isEmpty()) {
            CalendarEntity original = originalList.get(0);
            original.setCalNo(entity.getCalNo());
            original.setComment(entity.getComment());
            original.setName(entity.getName());
            original.setTimezone(entity.getTimezone());

            calendarRepository.save(original);
        }
        return calendarRepository.findByCalNo(entity.getCalNo());
    }

    // final Optional<CalendarEntity> original =
    // calendarRepository.findByCalNo(entity.getCalNo());
    // original.ifPresent(calendar -> {
    // calendar.setCalNo(entity.getCalNo());
    // calendar.setComment(entity.getComment());
    // calendar.setName(entity.getName());
    // calendar.setTimezone(entity.getTimezone());

    // calendarRepository.save(calendar);
    // });
    // return calendarRepository.findByCalNo(entity.getCalNo());
    // }
}
