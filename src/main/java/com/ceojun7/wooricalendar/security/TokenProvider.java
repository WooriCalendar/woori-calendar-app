package com.ceojun7.wooricalendar.security;

import com.ceojun7.wooricalendar.model.MemberEntity;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
/**
 * @author : DGeon
 * @packageName : com.ceojun7.wooricalendar.security
 * @fileName : TokenProvider
 * @date : 2023-06-01
 * @description :
 * ===========================================================
 * DATE           AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2023-06-01        DGeon             최초 생성
 **/
@Service
public class TokenProvider {
    private static final String SECRET_KEY = "WOORI";

    public String create(MemberEntity memberEntity) {
        // 기한은 지금으로부터 1일로 설정
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS));
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(memberEntity.getEmail())//원래 id였음
                .setIssuer("Wa")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }

    public String create(Authentication authentication) {
        Date expiryDate = Date.from(
                Instant.now().plus(1, ChronoUnit.DAYS));
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(((ApplicationOAuth2User) authentication.getPrincipal()).getName())
                .setIssuer("Wa")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }
    // token id 반환
    public String validateAndGetId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}