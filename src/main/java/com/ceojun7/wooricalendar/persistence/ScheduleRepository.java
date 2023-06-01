package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : ScheduleRepository
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-05-31        김설하           최초 생성
 */
@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String> {
    List<ScheduleEntity> findByCalendarEntity_CalNo(Long calNo);
}
