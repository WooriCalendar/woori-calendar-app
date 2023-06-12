package com.ceojun7.wooricalendar.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

/**
 * @author : DGeon
 * @packageName :
 * @fileName : ApplicationOAuth2User
 * @date : 2023-06-01
 * @packageName :
 * @packageName : com.ceojun7.wooricalendar.security
 * @description : =========================================================== DATE           AUTHOR             NOTE ----------------------------------------------------------- 2023-06-01        DGeon             최초 생성
 */
public class ApplicationOAuth2User implements OAuth2User {

    private String id;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;

    public ApplicationOAuth2User(String id, Map<String, Object> attributes) {
        this.id = id;
        this.attributes = attributes;
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getName() {
        return this.id;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }
}
