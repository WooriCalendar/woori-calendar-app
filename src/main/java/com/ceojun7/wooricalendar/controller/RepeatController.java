package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.RepeatDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.RepeatEntity;
import com.ceojun7.wooricalendar.service.RepeatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : 김설하
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : RepeatController
 * @date : 2023-06-08
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-08        김설하             최초 생성
 */

@RestController
@RequestMapping("repeat")
@Slf4j
public class RepeatController {
    @Autowired
    private RepeatService repeatService;

    @PostMapping
    public ResponseEntity<?> createRepeat(@RequestBody RepeatDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            RepeatEntity entity = RepeatDTO.toEntity(dto);
            List<RepeatEntity> entities = repeatService.create(entity);
            List<RepeatDTO> dtos = entities.stream().map(RepeatDTO::new).collect(Collectors.toList());
            ResponseDTO<RepeatDTO> response = ResponseDTO.<RepeatDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<RepeatDTO>builder().error(e.getMessage()).build());
        }
    }
}
