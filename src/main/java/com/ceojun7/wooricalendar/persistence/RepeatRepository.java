package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.RepeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : RepeatRepository
 * @date : 2023-06-08
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-08        김설하             최초 생성
 */

@Repository
public interface RepeatRepository extends JpaRepository<RepeatEntity, String> {
    List<RepeatEntity> findByScheduleEntity_ScNo(Long scNo);
}
