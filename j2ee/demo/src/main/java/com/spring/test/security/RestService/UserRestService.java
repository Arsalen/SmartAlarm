package com.spring.test.security.RestService;



import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import javax.management.Query;
import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.spring.test.DAO.HistoriqueRepository;
import com.spring.test.DAO.Historique_ServeurRepository;
import com.spring.test.DAO.LockstateRepository;
import com.spring.test.DAO.SongRepository;
import com.spring.test.RestService.SimpleEmailSender;
import com.spring.test.entities.Historique;
import com.spring.test.entities.Historique_Serveur;
import com.spring.test.entities.Lockstate;
import com.spring.test.entities.Song;
import com.spring.test.security.ConfirmRegistration.VerificationTokenRepository;
import com.spring.test.security.model.security.User;
import com.spring.test.security.model.security.VerificationToken;
import com.spring.test.security.security.JwtTokenUtil;
import com.spring.test.security.security.repository.UserRepository;
import com.spring.test.security.security.service.JwtAuthenticationResponse;



@RestController
public class UserRestService {

	private EntityManager _entityManager;
	
	@Autowired
	private UserRepository userRepository ;
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepository ;
	
	@Autowired
	private HistoriqueRepository historiqueRepository ;
	
	@Autowired
	private Historique_ServeurRepository historique_serveurRepository ;
	
	@Autowired
	private SongRepository songRepository ;
	
	@Autowired
	private LockstateRepository lockstateRepository ;
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    ApplicationEventPublisher eventPublisher;
    
    @Autowired
    SimpleEmailSender simpleEmailSender;
    
//    @Autowired
//    VerificationToken verificationToken;
//    
    @Autowired
    VerificationTokenRepository tokenRepository ;
   
    
	@RequestMapping(value="/users/register" , method = RequestMethod.POST) 
	public User addUser(@RequestBody User u) throws Exception  {
		
		System.out.print("-----------------------------------------1");
		if (userRepository.findByEmail(u.getEmail()) != null ) {
			System.out.print(userRepository.findByEmail(u.getEmail()));
			return null;
		}
		System.out.print("-----------------------------------------2");
		String noDecrypted = u.getPassword();
		u.setPassword(passwordEncoder.encode(noDecrypted));
		//debut mail confirmation logic
		System.out.print("-----------------------------------------3");
		User registered = userRepository.save(u); //user sauvegardé mais non activé (enabled =0 )
		System.out.print("-----------------------------------------4");
		/// créer Token de confirmation de l'email
		String token = UUID.randomUUID().toString();
		VerificationToken myToken = new VerificationToken(token,u,new Date());
		tokenRepository.save(myToken);
//		System.out.print("*******************************"+myToken.getToken());
		simpleEmailSender.sendEmail(u.getEmail(),token);
		//end
		
		return registered; 
		
		
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public User get(@PathVariable("id") long id){
		return (User) userRepository.findOne(id);
	}
	
	@RequestMapping(value = "/userss/{username}", method = RequestMethod.GET)
	public User getbyusername(@PathVariable("username") String username){
		return (User) userRepository.findByUsername(username);
	}
	
	@RequestMapping(value = "/usersw", method = RequestMethod.POST)
	public List<User> getuserprop(@RequestBody User prop){
		return userRepository.findByProp(prop);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
	public User put(@PathVariable("id") long id, @RequestBody User u){
		return (User) userRepository.saveAndFlush(u);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id){
		userRepository.delete(id);
	}
	
	@RequestMapping(value = "/userse/{id}", method = RequestMethod.DELETE)
	public void deletetoken(@PathVariable("id") long id){
		verificationTokenRepository.delete(id);
	}
	
	@RequestMapping(value = "/usersa", method = RequestMethod.GET)
	public List<Historique> getHistorique(){
		return historiqueRepository.findAll();
	}
	
	@RequestMapping(value = "/usersi", method = RequestMethod.POST)
	public Song post(@RequestBody Song u){
		return (Song) songRepository.save(u);
	}
	
	@RequestMapping(value = "/usersi", method = RequestMethod.GET)
	public List<Song> getSong(){
		return songRepository.findAll();
	}
	
	@RequestMapping(value = "/usersi/{id}", method = RequestMethod.DELETE)
	public void deleteSong(@PathVariable("id") long id){
		songRepository.delete(id);
	}
	
	@RequestMapping(value = "/usersh", method = RequestMethod.GET)
	public List<Historique_Serveur> getHistoriqueServer(){
		return historique_serveurRepository.findAll();
	}
	
	@RequestMapping(value = "/usersp", method = RequestMethod.GET)
	public List<Lockstate> getLockstate(){
		return lockstateRepository.findAll();
	}

	@RequestMapping(value="/users/ConfirmRegistration/{token}") 
	public void ConfirmAddUser(@PathVariable("token") String token)  {
		//String realMail = mail+".slim@gmail.com";
		System.out.println(token);
		User u = tokenRepository.findByToken(token).getUser();
		System.out.println(u.getPrenom());
		System.out.println(u.getEnabled());
		
		u.setEnabled(1);
		System.out.println(u.getEnabled());
		userRepository.saveAndFlush(u);
		System.out.println(u.getEnabled());
	}
}
