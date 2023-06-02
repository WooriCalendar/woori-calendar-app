package com.ceojun7.wooricalendar.dto;

import java.util.Date;

import com.ceojun7.wooricalendar.model.ShareEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : ShareDTO.java
 * @author : 박현민
 * @date : 2023.06.02
 * @description : 공유
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.02 박현민 최초 생성
 */

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ShareDTO {
  private Long calNo;
  private String email;
  private boolean checked;
  private Date regDate;
  private Date updateDate;
  private Long gradeNo;

  // entity > dto
  public ShareDTO(final ShareEntity entity) {
    this.calNo = entity.getCalNo();
    this.email = entity.getEmail();
    this.checked = entity.isChecked();
    this.regDate = entity.getRegDate();
    this.updateDate = entity.getUpdateDate();
    this.gradeNo = entity.getGradeNo();
  }

  // dto > entity
  public static ShareEntity toEntity(final ShareDTO dto) {
    return ShareEntity.builder()
        .calNo(dto.getCalNo())
        .email(dto.getEmail())
        .checked(dto.isChecked())
        .regDate(dto.getRegDate())
        .updateDate(dto.getUpdateDate())
        .gradeNo(dto.getGradeNo())
        .build();
  }
}
