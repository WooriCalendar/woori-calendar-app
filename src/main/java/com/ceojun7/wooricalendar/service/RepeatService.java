package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.RepeatEntity;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import com.ceojun7.wooricalendar.persistence.RepeatRepository;
import com.ceojun7.wooricalendar.persistence.ScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : RepeatService
 * @date : 2023-06-08
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-08        김설하             최초 생성
 */

@Service
@Slf4j
public class RepeatService {
    @Autowired
    private RepeatRepository repeatRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<RepeatEntity> create(final RepeatEntity entity) {
        repeatRepository.save(entity);
        ScheduleEntity scheduleEntity = scheduleRepository.findByScNo(entity.getScheduleEntity().getScNo()).get(0);
        return repeatRepository.findByScheduleEntity_ScNo(scheduleEntity.getScNo());
    }

    public List<RepeatEntity> retrieve(Long scNo) {
        return repeatRepository.findByScheduleEntity_ScNo(scNo);
    }
}
