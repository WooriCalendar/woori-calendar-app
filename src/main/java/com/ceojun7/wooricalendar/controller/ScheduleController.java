package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.dto.ScheduleDTO;
import com.ceojun7.wooricalendar.model.ScheduleEntity;
import com.ceojun7.wooricalendar.service.ScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @packageName : com.ceojun7.wooricalendar.contorller
 * @fileName : ScheduleController.java
 * @author : 김설하
 * @date : 2023.05.31
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.05.31 김설하 최초 생성
 *              2023.06.01 강태수 update, delete, day 생성
 */
@RestController
@RequestMapping("schedule")
@Slf4j
public class ScheduleController {
    @Autowired
    private ScheduleService service;

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            ScheduleEntity entity = ScheduleDTO.toEntity(dto);
            List<ScheduleEntity> entities = service.create(entity);
            List<ScheduleDTO> dtos = entities.stream().map(ScheduleDTO::new).collect(Collectors.toList());
            ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<ScheduleDTO>builder().error(e.getMessage()).build());
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveSchedule(@AuthenticationPrincipal String email) {
        List<ScheduleEntity> entities = service.retrieveByEmail(email);
        List<ScheduleDTO> dtos = entities.stream().map(ScheduleDTO::new).collect(Collectors.toList());
        ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/day")
    public ResponseEntity<?> daySchedule(@RequestBody ScheduleDTO dto) {
        // log.warn(String.valueOf(dto.getCalNo()));
        List<ScheduleEntity> entities = service.day(dto.getStart());
        List<ScheduleDTO> dtos = entities.stream().map(ScheduleDTO::new).collect(Collectors.toList());
        ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateSchedule(@RequestBody ScheduleDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            ScheduleEntity entity = ScheduleDTO.toEntity(dto);
            List<ScheduleEntity> entities = service.update(entity);
            List<ScheduleDTO> dtos = entities.stream().map(ScheduleDTO::new).collect(Collectors.toList());
            ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<ScheduleDTO>builder().error(e.getMessage()).build());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteSchedule(@RequestBody ScheduleDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            ScheduleEntity entity = ScheduleDTO.toEntity(dto);
            List<ScheduleEntity> entities = service.delete(entity);
            List<ScheduleDTO> dtos = entities.stream().map(ScheduleDTO::new).collect(Collectors.toList());
            ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<ScheduleDTO>builder().error(e.getMessage()).build());
        }
    }

}
