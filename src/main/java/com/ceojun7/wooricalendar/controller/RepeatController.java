package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.RepeatDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.RepeatEntity;
import com.ceojun7.wooricalendar.service.RepeatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-06-08 김설하 최초 생성
 *              2023-06-09 강태수 get,put,delete 생성
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

    @GetMapping
    public ResponseEntity<?> viewRepeat(@RequestBody RepeatDTO dto) {
        RepeatEntity entity = RepeatDTO.toEntity(dto);
        List<RepeatEntity> entities = repeatService.view(dto.getReNo());
        List<RepeatDTO> dtos = entities.stream().map(RepeatDTO::new).collect(Collectors.toList());
        ResponseDTO<RepeatDTO> response = ResponseDTO.<RepeatDTO>builder().data(dtos).build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateRepeat(@RequestBody RepeatDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            RepeatEntity entity = RepeatDTO.toEntity(dto);
            List<RepeatEntity> entities = repeatService.update(entity);
            List<RepeatDTO> dtos = entities.stream().map(RepeatDTO::new).collect(Collectors.toList());
            ResponseDTO<RepeatDTO> response = ResponseDTO.<RepeatDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<RepeatDTO>builder().error(e.getMessage()).build());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteRepeat(@RequestBody RepeatDTO dto) {
        log.warn(String.valueOf(dto));
        try {
            RepeatEntity entity = RepeatDTO.toEntity(dto);

            List<RepeatEntity> entities = repeatService.delete(entity);
            List<RepeatDTO> dtos = entities.stream().map(RepeatDTO::new).collect(Collectors.toList());
            ResponseDTO<RepeatDTO> response = ResponseDTO.<RepeatDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(ResponseDTO.<RepeatDTO>builder().error(e.getMessage()).build());
        }
    }
}
