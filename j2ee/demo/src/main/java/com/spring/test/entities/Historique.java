package com.spring.test.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Historique implements Serializable {
@Id @GeneratedValue @NotNull

	private long id;
	private Date datetime;
	private String user_name;
	private String user_login;
	private int canpass;
	public Historique() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Historique(Date datetime, String user_name, String user_login,
			int canpass) {
		super();
		this.datetime = datetime;
		this.user_name = user_name;
		this.user_login = user_login;
		this.canpass = canpass;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Date getDatetime() {
		return datetime;
	}
	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_login() {
		return user_login;
	}
	public void setUser_login(String user_login) {
		this.user_login = user_login;
	}
	public int getCanPass() {
		return canpass;
	}
	public void setCanPass(int canpass) {
		this.canpass = canpass;
	}
}
