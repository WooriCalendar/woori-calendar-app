package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The interface Notification repository.
 *
 * @author      : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName    : NotificationRepository
 * @date        : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        Hamdoson           최초 생성
 * 2023-06-05        Hamdoson           findByRevEmail, findByCalendarEntity_calNo 추가
 */
@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    /**
     * methodName : findByNtNo
     * comment : 단일조회
     * author : Hamdoson
     * date : 2023-06-13
     * description :
     *
     * @param ntNo the n no
     * @return the notification entity
     */
    NotificationEntity findByNtNo(Long ntNo);

    /**
     * methodName : findByRevEmail
     * comment : 이메일을 통한 받은 알림 전체조회
     * author : Hamdoson
     * date : 2023-06-13
     * description :
     *
     * @param revEmail the rev email
     * @return the list
     */
    List<NotificationEntity> findByRevEmail(String revEmail);

    /**
     * methodName : findByCalendarEntity_CalNo
     * comment : 캘린더번호를 통한 캘린더엔티티 조회
     * author : Hamdoson
     * date : 2023-06-13
     * description :
     *
     * @param calNo the cal no
     * @return the list
     */
    List<NotificationEntity> findByCalendarEntity_CalNo(Long calNo);
}
