package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @packageName    : com.ceojun7.wooricalendar.persistence
 * @fileName       : CalendarRepository.java
 * @author         : 김설하
 * @date           : 2023.05.31
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.05.31         김설하           최초 생성
 */

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, String> {
    List<CalendarEntity> findByCalNo(Long calNo);
    List<CalendarEntity> findByName(String name);
}
