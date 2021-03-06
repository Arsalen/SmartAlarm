package com.spring.test.security.security;

import com.spring.test.security.model.security.Authority;
import com.spring.test.security.model.security.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public final class JwtUserFactory {

    private JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPrenom(),
                user.getEmail(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getAuthorities()),
                user.getEnabled(),
                user.getLastPasswordResetDate(),
                user.getNom(),
                user.getStatus(),
                user.getSong(),
                user.getFcmtoken(),
                user.getCommentaire(),
                user.getTempsautorisation(),
                user.getTypeautorisation(),
                user.getProp()
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Authority> authorities) {
    	List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
		for (Authority authority: authorities){
				list.add( new SimpleGrantedAuthority(authority.getName().name()));
				
		}
		return list;
    }
}
