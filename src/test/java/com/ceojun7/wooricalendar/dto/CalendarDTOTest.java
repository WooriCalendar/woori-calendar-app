package com.ceojun7.wooricalendar.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;

import org.junit.jupiter.api.Test;

/**
 * @packageName : com\ceojun7\wooricalendar\dto\CalendarDTOTest.java
 * @fileName : CalendarDTOTest
 * @author : 강태수
 * @date : 2023-06-13
 * @description : 캘린더 DTO 테스트
 *              ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-06-13 강태수 최초 생성
 */
class CalendarDTOTest {
  private CalendarDTO calendarDTO;

  /**
   * methodName : testCalendarDTO
   * comment : DTO 생성 테스트
   * author : 강태수
   * date : 2023-06-13
   * description : DTO 생성 테스트
   *
   * 
   */

  @Test
  public void testCalendarDTO() {
    // 필드
    // private Long calNo;
    // private String name;
    // private String comment;
    // private String timeZone;
    // private Date regDate;
    // private Date updateDate;

    calendarDTO = CalendarDTO
        .builder()
        .calNo(20L)
        .name("kang")
        .comment("hi")
        .timeZone("GMT+9")
        .build();

    // 테스트
    assertEquals(20L, calendarDTO.getCalNo());
    assertEquals("kang", calendarDTO.getName());
    assertEquals("hi", calendarDTO.getComment());
    assertEquals("GMT+9", calendarDTO.getTimeZone());

  }
}
