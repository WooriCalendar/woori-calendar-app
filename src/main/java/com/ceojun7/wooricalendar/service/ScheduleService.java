package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import com.ceojun7.wooricalendar.persistence.ScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    public List<ScheduleEntity> create(final ScheduleEntity entity) {
        scheduleRepository.save(entity);
        CalendarEntity calendarEntity = calendarRepository.findByCalNo(entity.getCalendarEntity().getCalNo()).get(0);

        return scheduleRepository.findByCalendarEntity_CalNo(calendarEntity.getCalNo());
    }

    public List<ScheduleEntity> retrieve(Long calNo) {
        return scheduleRepository.findByCalendarEntity_CalNo(calNo);
    }
}
