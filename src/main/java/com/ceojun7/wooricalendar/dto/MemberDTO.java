package com.ceojun7.wooricalendar.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.dto
 * @fileName : MemberDTO
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon         최초 생성
 **/
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDTO {
    private String token;
    private String email;
    private String password;
    private String nickname;
    private String subemail;
}