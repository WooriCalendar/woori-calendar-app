package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.model.MemberEntity;
import com.ceojun7.wooricalendar.persistence.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.service
 * @fileName : MemberService
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon             최초 생성
 **/
@Slf4j
@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    /**
     * methodName : create
     * comment :
     * author : DGeon
     * date : 2023-06-01
     * description :
     *
     * @param memberEntity the member entity
     * @return member entity
     */
    public MemberEntity create(final MemberEntity memberEntity){
        if(memberEntity == null || memberEntity.getEmail()== null){
            throw new RuntimeException("Invaild arguments");
        }
        final String email = memberEntity.getEmail();
        if (memberRepository.existsByEmail(email)) {
            log.warn("Username already exists {}", email);
            throw new RuntimeException("Username already exists");
        }
        return memberRepository.save(memberEntity);
    }

    public MemberEntity getByCredentials(final String email, final String password, PasswordEncoder encoder) {
        MemberEntity memberEntity = memberRepository.findByEmail(email);
        if (memberEntity != null && encoder.matches(password, memberEntity.getPassword())) {
            return memberEntity;
        }
        return null;
    }

}