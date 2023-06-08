package com.ceojun7.wooricalendar.controller;

/**
 * @packageName    : C:\workspaces\final\woori-calendar\src\main\java\com\ceojun7\wooricalendar\controller\TimeController.java
 * @fileName       : TimeController
 * @author         : 강태수
 * @date           : 2023.06.08
 * @description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023.06.08        강태수       최초 생성
 */
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
public class TimeController {

  @PostMapping("/time")
  public TimeInfo getTimeInfo(@RequestBody TimeRequest timeRequest) {
    LocalDateTime now = LocalDateTime.now();
    ZoneId zone = ZoneId.of(timeRequest.getTimezone());

    boolean isSummerSavingTime = isSummerSavingTime(now, zone);

    return new TimeInfo(now, isSummerSavingTime);
  }

  private boolean isSummerSavingTime(LocalDateTime dateTime, ZoneId zone) {
    LocalDateTime start = LocalDateTime.of(dateTime.getYear(), Month.MARCH, 1, 2, 0);
    LocalDateTime end = LocalDateTime.of(dateTime.getYear(), Month.NOVEMBER, 1, 2, 0);

    return dateTime.isAfter(start) && dateTime.isBefore(end)
        && zone.getRules().isDaylightSavings(dateTime.toInstant(zone.getRules().getOffset(dateTime)));
  }

  private static class TimeRequest {
    private String timezone;

    public String getTimezone() {
      return timezone;
    }

    public void setTimezone(String timezone) {
      this.timezone = timezone;
    }
  }

  private static class TimeInfo {
    private LocalDateTime currentTime;
    private boolean isSummerSavingTime;

    public TimeInfo(LocalDateTime currentTime, boolean isSummerSavingTime) {
      this.currentTime = currentTime;
      this.isSummerSavingTime = isSummerSavingTime;
    }

    public LocalDateTime getCurrentTime() {
      return currentTime;
    }

    public boolean isSummerSavingTime() {
      return isSummerSavingTime;
    }
  }
}

// @RestController
// @RequestMapping("api")
// @Slf4j
// public class TimeController {

// @GetMapping("time")
// public TimeInfo getTimeInfo() {
// LocalDateTime now = LocalDateTime.now();
// ZoneId zone = ZoneId.systemDefault();

// boolean isSummerSavingTime = isSummerSavingTime(now, zone);

// return new TimeInfo(isSummerSavingTime);
// }

// private boolean isSummerSavingTime(LocalDateTime dateTime, ZoneId zone) {
// LocalDateTime start = LocalDateTime.of(dateTime.getYear(), Month.MARCH, 1, 2,
// 0);
// LocalDateTime end = LocalDateTime.of(dateTime.getYear(), Month.NOVEMBER, 1,
// 2, 0);

// return dateTime.isAfter(start) && dateTime.isBefore(end)
// &&
// zone.getRules().isDaylightSavings(dateTime.toInstant(zone.getRules().getOffset(dateTime)));
// }

// private static class TimeInfo {
// private boolean isSummerSavingTime;

// public TimeInfo(boolean isSummerSavingTime) {
// this.isSummerSavingTime = isSummerSavingTime;
// }

// public boolean isSummerSavingTime() {
// return isSummerSavingTime;
// }
// }
// }
