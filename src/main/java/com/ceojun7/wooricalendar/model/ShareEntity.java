package com.ceojun7.wooricalendar.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : ShareEntity.java
 * @author : 박현민
 * @date : 2023.06.02
 * @description : 공유
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.02 박현민 최초 생성
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tbl_share")
public class ShareEntity {
  @Id
  @JoinColumn(name = "calNo")
  private Long calNo;
  @JoinColumn(name = "email")
  private String email;
  private boolean checked;
  private Date regDate;
  private Date updateDate;
  private Long gradeNo;
}
