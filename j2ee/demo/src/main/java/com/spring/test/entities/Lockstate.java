package com.spring.test.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;



@Entity
public class Lockstate implements Serializable{
@Id @GeneratedValue @NotNull
	private long id;
	private int currentstate;

public Lockstate() {
	super();
	// TODO Auto-generated constructor stub
}

public Lockstate(int currentstate) {
	super();
	this.currentstate = currentstate;
}

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public long getCurrentState() {
	return currentstate;
}

public void setCurrentState(int currentstate) {
	this.currentstate = currentstate;
}
}
