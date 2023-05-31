package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CalendarService {
    @Autowired
    private CalendarRepository calendarRepository;

    public List<CalendarEntity> retrieve(Long calNo) {
        return calendarRepository.findByCalNo(calNo);
    };
}
