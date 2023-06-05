package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import com.ceojun7.wooricalendar.persistence.CalendarRepository;
import com.ceojun7.wooricalendar.persistence.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The type Notification service.
 *
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : NotificationService
 * @date : 2023-06-01
 * @description : =========================================================== DATE           AUTHOR             NOTE ----------------------------------------------------------- 2023-06-01        Hamdoson           최초 생성
 */
@Service
@Slf4j
public class NotificationService {
    /**
     * The Notification repository.
     */
    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    private CalendarRepository calendarRepository;

    /**
     * methodName : create
     * comment : Create Notification
     * author : Hamdoson
     * date : 2023-06-05
     * description : Notification Create
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
     * comment : Retrieve Notification list of revEmail
     * author : Hamdoson
     * date : 2023-06-05
     * description : Retrieve Notification list of revEmail
     *
     * @param revEmail the rev email
     * @return the list
     */
    public List<NotificationEntity> retrieve(String revEmail){
        return notificationRepository.findByRevEmail(revEmail);
    }

}
