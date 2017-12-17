package com.spring.test.security.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.test.security.model.security.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

/**
 * Created by stephan on 20.03.16.
 */
public class JwtUser implements UserDetails {

	private final Long id;
    private final String username;
    private final String prenom;
    private final String password;
    private final String email;
    private final Collection<? extends GrantedAuthority> authorities;
    private final int enabled;
    private final Date lastPasswordResetDate;
    
    private final String nom; 
    private final String status;
    private final int song;
    private final String fcmtoken;

    private final String commentaire;
    private final String tempsautorisation;
    private final String typeautorisation;
    
    private final User prop;

    public JwtUser(
          Long id,
          String username,
          String prenom,
          String email,
          String password, Collection<? extends GrantedAuthority> authorities,
          int enabled,
          Date lastPasswordResetDate, 
          String nom, 
          String status, 
          int song,
          String fcmtoken,
          String tempsautorisation,
          String typeautorisation,
          String commentaire,
          User prop
          ) {
        this.id = id;
        this.username = username;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.enabled = enabled;
        this.lastPasswordResetDate = lastPasswordResetDate;
        this.nom = nom;
        this.status = status;
        this.song = song;
        this.fcmtoken = fcmtoken;
        this.commentaire= commentaire;
        this.tempsautorisation= tempsautorisation;
        this.typeautorisation= typeautorisation;
        this.prop = prop;
    }

    public int getEnabled() {
		return enabled;
	}
    
    public User getProp() {
		return prop;
	}

	public String getNom() {
		return nom;
	}

	public String getStatus() {
		return status;
	}

	public int getSong() {
		return song;
	}

	public String getFcmtoken() {
		return fcmtoken;
	}
	
	public String getTypeautorisation() {
		return typeautorisation;
	}
	
	public String getTempsautorisation() {
		return tempsautorisation;
	}
	
	public String getCommentaire() {
		return commentaire;
	}

	@JsonIgnore
    public Long getId() {
        return id;
    }

//    @Override
//    public String getUsername() {
//        return username;
//    }
    public String getUsername() {
    	// TODO Auto-generated method stub
    	return username;
    }
//
//    @JsonIgnore
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
    @JsonIgnore
    public boolean isAccountNonExpired() {
    	// TODO Auto-generated method stub
    	return true;
    }
    
//    @JsonIgnore
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
    
    @JsonIgnore
    public boolean isAccountNonLocked() {
    	// TODO Auto-generated method stub
    	return true;
    }
  
//
//    @JsonIgnore
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
    
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
    	// TODO Auto-generated method stub
    	return true;
    }
    
 
    
    
    
    

    public String getPrenom() {
        return prenom;
    }

    public String getEmail() {
        return email;
    }

//    @JsonIgnore
//    @Override
//    public String getPassword() {
//        return password;
//    }
    @JsonIgnore
    public String getPassword() {
    	// TODO Auto-generated method stub
    	return password;
    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	// TODO Auto-generated method stub
    	return authorities;
    }
//
//    @Override
//    public boolean isEnabled() {
//        return enabled;
//    }
    
    
    
    
    
    

    @JsonIgnore
    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

	public boolean isEnabled() {
		// TODO Auto-generated method stub
		boolean isEnabled;
		if (enabled == 1) isEnabled = true;
		else isEnabled = false;
		return isEnabled;
	}












}
