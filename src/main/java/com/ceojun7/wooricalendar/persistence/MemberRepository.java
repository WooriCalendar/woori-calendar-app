package com.ceojun7.wooricalendar.persistence;

import com.ceojun7.wooricalendar.model.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    MemberEntity findByEmail(String email);
    boolean existsByEmail(String email);
    MemberEntity findByEmailAndPassword(String email, String password);
}