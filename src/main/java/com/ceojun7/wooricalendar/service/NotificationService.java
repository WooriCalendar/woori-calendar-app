package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import com.ceojun7.wooricalendar.persistence.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The type Notification service.
 *
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : NotificationService
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01     Hamdoson           최초 생성
 * 2023-06-05     Hamdoson           create, retrieve 생성
 * 2023-06-08     Hamdoson           delete 생성
 */
@Service
@Slf4j
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    /**
     * methodName : create
     * comment : Create Notification
     * author : Hamdoson
     * date : 2023-06-05
     * description : Notification Create생성
     *
     * @param notificationEntity the notification entity
     * @return the list
     */
    public List<NotificationEntity> create(final NotificationEntity notificationEntity) {
        notificationRepository.save(notificationEntity);

        CalendarEntity calendarEntity = calendarRepository.findByCalNo(notificationEntity.getCalendarEntity().getCalNo()).get(0);
        return notificationRepository.findByCalendarEntity_CalNo(calendarEntity.getCalNo());
    }

    /**
     * methodName : retrieve
     * comment : 이메일을 통한 알림 조회
     * author : Hamdoson
     * date : 2023-06-05
     * description : 수신자의 이메일을 통한 알림을 조회한다.
     *
     * @param revEmail the rev email
     * @return the list
     */
    public List<NotificationEntity> retrieve(String revEmail){
        return notificationRepository.findByRevEmail(revEmail);
    }

    /**
     * methodName : delete
     * comment : 알림 삭제
     * author : Hamdoson
     * date : 2023-06-08
     * description : 알림번호를 통해 알림을 삭제한다.
     *
     * @param entity the entity
     * @return the list
     */
    public List<NotificationEntity> delete(final NotificationEntity entity) {
        try {
            notificationRepository.delete(entity);
        } catch(Exception e) {
            log.error("error deleting entity ", entity.getRevEmail(), e);
            throw new RuntimeException("error deleting entity " + entity.getRevEmail());
        }
        // (5) 새 Todo리스트를 가져와 리턴한다.
        return retrieve(entity.getRevEmail());
    }
}
