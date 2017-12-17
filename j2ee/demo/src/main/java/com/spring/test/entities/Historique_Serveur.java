package com.spring.test.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


@Entity
public class Historique_Serveur implements Serializable {
@Id @GeneratedValue @NotNull
	private long id;
	private Date time;
	private String method;
	private String source;
	private String useragent;
	private String contenttype;
	private String centent;
	private String response;
	public Historique_Serveur() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Historique_Serveur(Date time, String method, String source,
			String useragent, String contenttype, String centent, String response) {
		super();
		this.time = time;
		this.method = method;
		this.source = source;
		this.useragent = useragent;
		this.contenttype = contenttype;
		this.centent = centent;
		this.response = response;
		
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getUserAgent() {
		return useragent;
	}
	public void setUseragent(String useragent) {
		this.useragent = useragent;
	}
	public String getContenttype() {
		return contenttype;
	}
	public void setContenttype(String contenttype) {
		this.contenttype = contenttype;
	}
	public String getCentent() {
		return centent;
	}
	public void setCentent(String centent) {
		this.centent = centent;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	
}
