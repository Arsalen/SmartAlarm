package com.spring.test.RestService;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class SimpleEmailSender {
	@Autowired
    private JavaMailSender sender;
	
	public void sendEmail(String newUserMail, String token) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        
        helper.setFrom("smart.alarm.2017@gmail.com");
        helper.setTo(newUserMail);
        helper.setText("<html>"
        		+ "<body>"
        		+ "<p>Merci de votre confiance à utiliser Smart Alarm</p>"
        		+ "<p>Veuillez terminer la dernière étape en confirmant votre compte </p>"
        		+ "<p>par un simple click sur le lien ci-dessous :</p>"
//        		+ "<button>"
        		+ "<a href='http://localhost:8080/users/ConfirmRegistration/"+token+"' >Commencez à utiliser Smart Alarm</a>"
//        		+ "</button>"
//        		+ "<a href='http://localhost:4200/connexion' >Commencez à utiliser Smart Alarm</a>"
//        		+ "<form action='http://localhost:8080/users/ConfirmRegistration' method='post'>"
//        		+"<button type='submit' name='email' value='"+newUserMail+"'>Complete this registration</button>"
//        		+"</form>"
        		//+ "<a href='http://localhost:8080/users/ConfirmRegistration'>https://mail.google.com/mail/u/0/#inbox/15d371f840a7038f</a>"
        		+ "</body>"
        		+ "</html>"
        		,true);
        
        sender.send(message);
    }
}
