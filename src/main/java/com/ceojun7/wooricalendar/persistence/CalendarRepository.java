package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, String> {
    List<CalendarEntity> findByCalNo(Long calNo);
}
