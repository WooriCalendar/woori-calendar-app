package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

/**
 * @author : 김설하, 강태수
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : ScheduleRepository
 * @date : 2023-06-01
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-05-31 김설하 최초 생성
 *              2023-06-02 강태수 findByStartDate 생성
 */
@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String> {
    List<ScheduleEntity> findByCalendarEntity_CalNo(Long calNo);

    List<ScheduleEntity> findByScNo(Long scNo);

    List<ScheduleEntity> findByStartDate(Timestamp startDate);

}
