package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String> {
    List<ScheduleEntity> findByCalNo(Long calNo);
}
