package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import com.ceojun7.wooricalendar.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : Hamdoson
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : NotificationController
 * @date : 2023-06-01
 * @description :알림에 대한
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01     Hamdoson           최초 생성
 * 2023-06-05     Hamdoson           createNotification, retrieveNotificationList 생성
 */
@RestController
@RequestMapping("notification")
@Slf4j
public class NotificationController {

    @Autowired
    private NotificationService service;

    /**
     * methodName : createNotification
     * comment : Create
     * author : Hamdoson
     * date : 2023-06-05
     * description : 알림 생성(발송)
     *
     * @param dto the dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody NotificationDTO dto) {
        log.info(String.valueOf(dto));
        try {
            NotificationEntity entity = NotificationDTO.toEntity(dto);

            List<NotificationEntity> entities = service.create(entity);

            List<NotificationDTO> dtos = entities.stream().map(NotificationDTO::new).collect(Collectors.toList());

            ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {

            String error = e.getMessage();
            ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * methodName : retrieveNotificationList
     * comment : retrieve
     * author : Hamdoson
     * date : 2023-06-05
     * description : 받은이의 이메일로서의 조회
     *
     * @param dto the dto
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<?> retrieveNotificationList(@RequestBody NotificationDTO dto) {
        log.info(String.valueOf(dto));
        List<NotificationEntity> entities = service.retrieve(dto.getRevEmail());

        List<NotificationDTO> dtos = entities.stream().map(NotificationDTO::new).collect(Collectors.toList());

        ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().data(dtos).build();
        log.info(String.valueOf(response));
        return ResponseEntity.ok().body(response);
    }

    /**
     * methodName : deleteNotificiation
     * comment : 알림 삭제
     * author : Hamdoson
     * date : 2023-06-08
     * description : 알림 삭제
     *
     * @param dto the dto
     * @return the response entity
     */
    @DeleteMapping
    public ResponseEntity<?> deleteNotification(@RequestBody NotificationDTO dto) {
        try {
            NotificationEntity entity = NotificationDTO.toEntity(dto);

            List<NotificationEntity> entities = service.delete(entity);

            List<NotificationDTO> dtos = entities.stream().map(NotificationDTO::new).collect(Collectors.toList());

            ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
