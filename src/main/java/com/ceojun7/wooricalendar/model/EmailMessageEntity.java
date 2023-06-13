package com.ceojun7.wooricalendar.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.model
 * @fileName : EmailMessage
 * @date : 2023-06-12
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-12        DGeon             최초 생성
 **/
@Getter
@Setter
@Builder
public class EmailMessageEntity {
    private String to;
    private String subject;
    private String message;
}