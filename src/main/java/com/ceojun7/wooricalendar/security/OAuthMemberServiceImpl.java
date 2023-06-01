package com.ceojun7.wooricalendar.security;

import com.ceojun7.wooricalendar.model.MemberEntity;
import com.ceojun7.wooricalendar.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.security
 * @fileName : OAuthMemberServiceImpl
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon             최초 생성
 **/
@Service
@Slf4j
public class OAuthMemberServiceImpl extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            log.info("OAuth2 member Info {} ", new ObjectMapper().writeValueAsString(oAuth2User));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        final String authProvider = userRequest.getClientRegistration().getClientName();
        log.info("{}", authProvider);

        String email = null;
        if (authProvider.equalsIgnoreCase("google")) {
            email = (String) oAuth2User.getAttribute("email");
        }

        // github 로그인 시 추가
//        if (authProvider.equalsIgnoreCase("github")) {
//            username = (String) oAuth2User.getAttribute("login");
//        } else

        // DB작업
        MemberEntity memberEntity = null;
        // db탐색 후 중복되는 id가 없을시 신규 id로 등록
        if (!memberRepository.existsByEmail(email)) {
            memberEntity = MemberEntity.builder().email(email).authProvider(authProvider).build();
            memberEntity = memberRepository.save(memberEntity);
        } else {
            memberEntity = memberRepository.findByEmail(email);
        }

        log.info("success pulled member info member {}, authProvider {}", email, authProvider);

        return new ApplicationOAuth2User(memberEntity.getEmail(), oAuth2User.getAttributes());
    }

}
