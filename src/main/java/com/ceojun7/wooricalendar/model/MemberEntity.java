package com.ceojun7.wooricalendar.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.model
 * @fileName : MemberEntity
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon             최초 생성
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_member")
public class MemberEntity {
    @Id
    private String email;
    private String password;
    private String nickname;
    private String subemail;
    private String birthday;
    private String regdate;
    private String updatedate;
    private String authProvider;
}