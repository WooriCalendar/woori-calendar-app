package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
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

    public List<ScheduleEntity> create(final ScheduleEntity entity) {
        scheduleRepository.save(entity);

        return scheduleRepository.findByCalNo(entity.getCalNo());
    }
}
