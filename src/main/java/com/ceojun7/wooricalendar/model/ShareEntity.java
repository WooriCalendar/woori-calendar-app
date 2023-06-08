package com.ceojun7.wooricalendar.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : ShareEntity.java
 * @author : 박현민
 * @date : 2023.06.02
 * @description : 공유(share)
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023.06.02 박현민 최초 생성1
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tbl_share")
@DynamicInsert
public class ShareEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long shareNo;
  @ManyToOne
  @JoinColumn(name = "calNo") // tbl_calendar
  private CalendarEntity calendarEntity;
  @ManyToOne
  @JoinColumn(name = "email") // tbl_member
  private MemberEntity memberEntity;
  private boolean checked;
  private Date regDate;
  private Date updateDate;
  private Long grade;
}