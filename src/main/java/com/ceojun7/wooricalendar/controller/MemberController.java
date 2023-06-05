package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.MemberDTO;
import com.ceojun7.wooricalendar.dto.ResponseDTO;
import com.ceojun7.wooricalendar.model.MemberEntity;
import com.ceojun7.wooricalendar.security.TokenProvider;
import com.ceojun7.wooricalendar.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : MemberController
 * @date : 2023-05-31
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-05-31        DGeon         최초 생성
 **/
@RestController
@RequestMapping("auth")
@Slf4j
public class MemberController {
    @Autowired
    private MemberService memberService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("signup")
    public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDTO){
        try {
            if (memberDTO == null || memberDTO.getPassword() == null) {
                throw new RuntimeException("Invalid Password value.");
            }
            // 요청을 이용해 저장할 유저 만들기
            MemberEntity member = MemberEntity.builder()
                    .email(memberDTO.getEmail())
                    .password(passwordEncoder.encode(memberDTO.getPassword()))
                    .regDate(new Date())
                    .updateDate(new Date())
                    .build();
            // 서비스를 이용해 레포지토리에 유저 저장
            MemberEntity registeredMember = memberService.create(member);
            MemberDTO responseUserDTO = memberDTO.builder()
                    .email(registeredMember.getEmail())
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } catch (Exception e) {
            // 유저 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO를 리턴
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getLocalizedMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    @PostMapping("signin")
    public ResponseEntity<?> authenticate(@RequestBody MemberDTO memberDTO) {
        log.info("{}", memberDTO);
        MemberEntity member = memberService.getByCredentials(memberDTO.getEmail(), memberDTO.getPassword(), passwordEncoder);
        log.info("{}", member);
        if (member != null) {
            // 토큰생성
            final String token = tokenProvider.create(member);
            log.info("발급 토큰 : {}", token);
            final MemberDTO responseUserDTO = memberDTO.builder()
                    .email(member.getEmail())
                    .token(token)
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        } else {
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("Login failed")
                    .build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }
}
