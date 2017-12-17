package com.spring.test.RestService;

import java.util.List;

import com.spring.test.DAO.LockstateRepository;
import com.spring.test.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LockstateRestService {
	@Autowired
	private LockstateRepository lockstateRepository;
	
	@RequestMapping(value="/lockstates" , method = RequestMethod.GET)
	public List<Lockstate> getAll() {
		return lockstateRepository.findAll(); 
	}
	
	@RequestMapping(value = "/lockstates/{id}", method = RequestMethod.GET)
	public Lockstate get(@PathVariable("id") long id){
		return (Lockstate) lockstateRepository.findOne(id);
	}
	
	@RequestMapping(value = "/lockstates", method = RequestMethod.POST)
	public Lockstate save(@RequestBody Lockstate lockstate){
		return (Lockstate) lockstateRepository.save(lockstate);
	}
	
	@RequestMapping(value = "/lockstates/{id}", method = RequestMethod.PUT)
	public Lockstate update(@RequestBody Lockstate lockstate){
		return (Lockstate) lockstateRepository.saveAndFlush(lockstate);
	}
	
	@RequestMapping(value = "/lockstates/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id){
		lockstateRepository.delete(id);
	}
}

