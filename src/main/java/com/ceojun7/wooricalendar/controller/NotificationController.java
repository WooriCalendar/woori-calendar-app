package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.NotificationDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.NotificationEntity;
import com.ceojun7.wooricalendar.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
 * 2023-06-01        Hamdoson             최초 생성
 */
@RestController
@RequestMapping("notification")
@Slf4j
public class NotificationController {

    @Autowired
    private NotificationService service;

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

    @GetMapping
    public ResponseEntity<?> retrieveNotificationList(@RequestBody NotificationDTO dto) {
        log.info(String.valueOf(dto));
        List<NotificationEntity> entities = service.retrieve(dto.getRevEmail());

        List<NotificationDTO> dtos = entities.stream().map(NotificationDTO::new).collect(Collectors.toList());

        ResponseDTO<NotificationDTO> response = ResponseDTO.<NotificationDTO>builder().data(dtos).build();
        log.info(String.valueOf(response));
        return ResponseEntity.ok().body(response);
    }
}
