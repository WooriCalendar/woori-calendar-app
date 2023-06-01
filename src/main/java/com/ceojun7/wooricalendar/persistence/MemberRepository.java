package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.persistence
 * @fileName : MemberRepository
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon             최초 생성
 **/
public interface MemberRepository extends JpaRepository<MemberEntity, String> {

}