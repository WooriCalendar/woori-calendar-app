package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : NotificationRepository
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        Hamdoson           최초 생성
 * 2023-06-05        Hamdoson           findByRevEmail, findByCalendarEntity_calNo 추가
 */
@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, String> {
    List<NotificationEntity> findByRevEmail(String revEmail);
    List<NotificationEntity> findByCalendarEntity_CalNo(Long calNo);
}
