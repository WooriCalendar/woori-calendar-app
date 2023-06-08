package com.ceojun7.wooricalendar.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.dto.ShareDTO;
import com.ceojun7.wooricalendar.model.ShareEntity;
import com.ceojun7.wooricalendar.service.ShareService;

import lombok.extern.slf4j.Slf4j;

/**
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : ShareController.java
 * @author : 박현민
 * @date : 2023.06.02
 * @description : 공유(share)
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.02 박현민 최초 생성
 *              2023.06.07 박현민 create 추가1
 */

@Slf4j
@RestController
@RequestMapping("share")
public class ShareController {

  @Autowired
  private ShareService service;

  @PostMapping
  public ResponseEntity<?> createShare(@RequestBody ShareDTO dto) {
    log.warn(String.valueOf(dto));
    try {
      ShareEntity entity = ShareDTO.toEntity(dto);
      List<ShareEntity> entities = service.create(entity);
      List<ShareDTO> dtos = entities.stream().map(ShareDTO::new).collect(Collectors.toList());
      ResponseDTO<ShareDTO> response = ResponseDTO.<ShareDTO>builder().data(dtos).build();
      return ResponseEntity.ok().body(response);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().body(ResponseDTO.<ShareDTO>builder().error(e.getMessage()).build());
    }
  }

  @PutMapping
  public ResponseEntity<?> updateShare(@RequestBody ShareDTO dto) {
    ShareEntity entity = ShareDTO.toEntity(dto);
    List<ShareEntity> entities = service.update(entity);
    List<ShareDTO> dtos = entities.stream().map(ShareDTO::new).collect(Collectors.toList());
    ResponseDTO<ShareDTO> response = ResponseDTO.<ShareDTO>builder().data(dtos).build();
    return ResponseEntity.ok().body(response);
  }

}