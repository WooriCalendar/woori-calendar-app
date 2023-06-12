package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.dto.RepeatDTO;
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
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-06-08 김설하 최초 생성
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

    public List<RepeatEntity> update(final RepeatEntity entity) {
        final List<RepeatEntity> originalList = repeatRepository.findByReNo(entity.getReNo());
        if (!originalList.isEmpty()) {
            RepeatEntity original = originalList.get(0);
            original.setEndDate(entity.getEndDate());
            original.setRePeriod(entity.getRePeriod());

            repeatRepository.save(original);
        }
        return repeatRepository.findByReNo(entity.getReNo());
    }

    public List<RepeatEntity> view(Long reNo) {
        return repeatRepository.findByReNo(reNo);
    }

    // public List<RepeatEntity> delete(final RepeatEntity entity) {
    // repeatRepository.delete(entity);
    // ScheduleEntity scheduleEntity =
    // scheduleRepository.findByScNo(entity.getScheduleEntity().getScNo()).get(0);
    // // ScheduleEntity scheduleEntity = scheduleRepository.fing
    // return repeatRepository.findByScheduleEntity_ScNo(scheduleEntity.getScNo());
    // // return repeatRepository.findByReNo(entity.getReNo());
    // }

    public List<RepeatEntity> delete(final RepeatEntity entity) {
        repeatRepository.delete(entity);
        // ScheduleEntity scheduleEntity =
        // scheduleRepository.findByScNo(entity.getScheduleEntity().getScNo()).get(0);
        // ScheduleEntity scheduleEntity = scheduleRepository.fing
        return repeatRepository.findByReNo(entity.getReNo());
        // return repeatRepository.findByReNo(entity.getReNo());
    }

}
