package com.spring.test.security.ConfirmRegistration;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.test.security.model.security.User;
import com.spring.test.security.model.security.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

	VerificationToken findByToken(String token);
	VerificationToken findByUser(User user);
	
	
}
