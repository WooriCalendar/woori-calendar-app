package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.CalendarDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.CalendarEntity;
import com.ceojun7.wooricalendar.service.CalendarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @packageName : com.ceojun7.wooricalendar.contorller
 * 
 * @fileName : CalendarController.java
 * @author : 김설하, 강태수
 * @date : 2023.05.31
 * @description :
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.05.31 김설하 최초 생성
 *              2023.06.01 강태수 update, delete 생성
 * 
 */
@RestController
@RequestMapping("calendar")
@Slf4j
public class CalendarController {
    @Autowired
    private CalendarService service;

    /**
     * methodName : createSchedule
     * comment : 새 calendar 생성
     * author : seolha86
     * date : 2023-06-01
     * description :
     *
     * @param dto the dto
     * @return the response entity
     * 
     * @DeleteMapping 생성
     */
    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody CalendarDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            CalendarEntity entity = CalendarDTO.toEntity(dto);
            List<CalendarEntity> entities = service.create(entity);
            List<CalendarDTO> dtos = entities.stream().map(CalendarDTO::new).collect(Collectors.toList());
            ResponseDTO<CalendarDTO> response = ResponseDTO.<CalendarDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<CalendarDTO>builder().error(e.getMessage()).build());
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveSchedule(@RequestBody CalendarDTO dto) {
        log.warn(String.valueOf(dto.getCalNo()));
        List<CalendarEntity> entities = service.retrieve(dto.getCalNo());
        List<CalendarDTO> dtos = entities.stream().map(CalendarDTO::new).collect(Collectors.toList());
        ResponseDTO<CalendarDTO> response = ResponseDTO.<CalendarDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateSchedule(@RequestBody CalendarDTO dto) {
        CalendarEntity entity = CalendarDTO.toEntity(dto);

        List<CalendarEntity> entities = service.update(entity);
        List<CalendarDTO> dtos = entities.stream().map(CalendarDTO::new).collect(Collectors.toList());
        ResponseDTO<CalendarDTO> response = ResponseDTO.<CalendarDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteSchedule(@RequestBody CalendarDTO dto) {

        try {
            CalendarEntity entity = CalendarDTO.toEntity(dto);

            List<CalendarEntity> entities = service.delete(entity);
            List<CalendarDTO> dtos = entities.stream().map(CalendarDTO::new).collect(Collectors.toList());
            ResponseDTO<CalendarDTO> response = ResponseDTO.<CalendarDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<CalendarDTO>builder().error(e.getMessage()).build());
        }

    }

    // 캘린더 번호로 조회해서 가져와서 수정
    @GetMapping("/{calNo}")
    public ResponseEntity<?> retrieveCalendar(@PathVariable Long calNo) {
        List<CalendarEntity> entities = service.retrieve(calNo);
        List<CalendarDTO> dtos = entities.stream().map(CalendarDTO::new).collect(Collectors.toList());
        ResponseDTO<CalendarDTO> response = ResponseDTO.<CalendarDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }
}
