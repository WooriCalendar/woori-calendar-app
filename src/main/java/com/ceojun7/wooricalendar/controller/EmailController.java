package com.ceojun7.wooricalendar.controller;

import com.ceojun7.wooricalendar.dto.EmailPostDTO;
import com.ceojun7.wooricalendar.dto.EmailResponseDTO;
import com.ceojun7.wooricalendar.model.EmailMessageEntity;
import com.ceojun7.wooricalendar.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.controller
 * @fileName : EmailController
 * @date : 2023-06-12
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-12        DGeon             최초 생성
 **/
@RequestMapping("/sendmail")
@RestController
@RequiredArgsConstructor
@Slf4j
public class EmailController {
    private final EmailService emailService;


    // 임시 비밀번호 발급
    @PostMapping("/password")
    public ResponseEntity<?> sendPasswordMail(@RequestBody EmailPostDTO emailPostDto) throws MessagingException {
        EmailMessageEntity emailMessage = EmailMessageEntity.builder()
                .to(emailPostDto.getEmail())
                .subject("[Woori] 임시 비밀번호 발급")
                .build();

        emailService.sendMail(emailMessage, "password");

        return ResponseEntity.ok().build();
    }

    // 회원가입 이메일 인증 - 요청 시 body로 인증번호 반환하도록 작성하였음
    @PostMapping("/email")
    public ResponseEntity<?> sendJoinMail(@RequestBody EmailPostDTO emailPostDto) throws MessagingException {
        log.warn(String.valueOf(emailPostDto));

        EmailMessageEntity emailMessage = EmailMessageEntity.builder()
                .to(emailPostDto.getEmail())
                .subject("[Woori] 이메일 인증을 위한 인증 코드 발송")
                .build();

        String code = emailService.sendMail(emailMessage, "email");

        EmailResponseDTO emailResponseDto = new EmailResponseDTO();
        emailResponseDto.setCode(code);
        log.warn(code);
        return ResponseEntity.ok(emailResponseDto);
    }
}