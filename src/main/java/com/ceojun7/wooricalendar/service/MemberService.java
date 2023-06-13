package com.ceojun7.wooricalendar.service;

import com.ceojun7.wooricalendar.dto.MemberDTO;
import com.ceojun7.wooricalendar.model.MemberEntity;
import com.ceojun7.wooricalendar.persistence.MemberRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.List;

import javax.transaction.Transactional;

/**
 * @author : DGeon
 * @packageName :
 * @fileName : MemberService
 * @date : 2023-06-01
 * @packageName : com.ceojun7.wooricalendar.service
 * @description : ===========================================================
 *              DATE AUTHOR NOTE
 *              -----------------------------------------------------------
 *              2023-06-01 DGeon 최초 생성 2023-06-04 getMemberByEmail,updateMember
 *              최초 생성
 */
@Slf4j
@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    /**
     * methodName : create
     * comment : 회원 생성
     * author : DGeon
     * date : 2023-06-01
     * description :
     *
     * @param memberEntity the member entity
     * @return member entity
     */
    public MemberEntity create(final MemberEntity memberEntity) {
        if (memberEntity == null || memberEntity.getEmail() == null) {
            throw new RuntimeException("Invaild arguments");
        }
        final String email = memberEntity.getEmail();
        if (memberRepository.existsByEmail(email)) {
            log.warn("Username already exists {}", email);
            throw new RuntimeException("Username already exists");
        }
        return memberRepository.save(memberEntity);
    }

    /**
     * Gets by credentials.
     * comment : 비밀번호(Bycrpt) 인증
     * author : DGeon
     * date : 2023-06-10
     * description :
     *
     * @param email    the email
     * @param password the password
     * @param encoder  the encoder
     * @return the by credentials
     */
    public MemberEntity getByCredentials(final String email, final String password, PasswordEncoder encoder) {
        MemberEntity memberEntity = memberRepository.findByEmail(email);
        if (memberEntity != null && encoder.matches(password, memberEntity.getPassword())) {
            return memberEntity;
        }
        return null;
    }

    public MemberDTO getMemberByEmail(String email) {
        MemberEntity memberEntity = memberRepository.findByEmail(email);
        if (memberEntity != null) {
            MemberDTO memberDTO = new MemberDTO();
            BeanUtils.copyProperties(memberEntity, memberDTO);
            return memberDTO;
        }
        return null;
    }

    /**
     * methodName : updateMember
     * comment : 패스워드,닉네임, 서브이메일, 생년월일, 언어 수정
     * author : 강태수
     * date : 2023-06-01
     * description :
     *
     * @param memberDTO
     *
     * @return
     * 
     */

    public boolean updateMember(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByEmail(memberDTO.getEmail());
        if (memberEntity != null) {
            // 필요한 필드를 업데이트합니다.
            memberEntity.setPassword(memberDTO.getPassword());
            memberEntity.setNickname(memberDTO.getNickname());
            memberEntity.setSubemail(memberDTO.getSubemail());
            memberEntity.setBirthday(memberDTO.getBirthday());
            memberEntity.setLanguage(memberDTO.getLanguage());
            memberRepository.save(memberEntity);
            return true;
        }
        return false;
    }
}