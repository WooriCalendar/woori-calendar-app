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


    /**
     * methodName : sendPasswordMail
     * comment : 임시비밀번호 발급 및 전송 메서드
     * author : DGeon
     * date : 2023-06-12
     * description :
     *
     * @param emailPostDto the email post dto
     * @return response entity
     * @throws MessagingException the messaging exception
     */
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

    /**
     * methodName : sendJoinMail
     * comment : 회원가입시 인증코드 보내는 메서드
     * author : DGeon
     * date : 2023-06-12
     * description :
     *
     * @param emailPostDto the email post dto
     * @return response entity
     * @throws MessagingException the messaging exception
     */
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