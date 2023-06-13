package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

/**
 * @author : seolha86, 강태수
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : ScheduleRepository
 * @date : 2023-06-01
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-05-31 seolha86 최초 생성
 *              2023-06-02 강태수 findByStartDate 생성
 */
@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String> {
    /**
     * methodName : findByCalendarEntity_CalNo
     * comment : 캘린더 넘버로 일정 조회
     * author : seolha86
     * date : 2023-06-13
     * description :
     *
     * @param calNo the cal no
     * @return the list
     */
    List<ScheduleEntity> findByCalendarEntity_CalNo(Long calNo);

    /**
     * methodName : findByScNo
     * comment : 일정 넘버로 일정 조회
     * author : seolha86
     * date : 2023-06-13
     * description :
     *
     * @param scNo the sc no
     * @return the list
     */
    List<ScheduleEntity> findByScNo(Long scNo);

    List<ScheduleEntity> findByStartDate(Timestamp startDate);

}
