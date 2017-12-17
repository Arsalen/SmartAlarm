package com.spring.test.RestService;

import java.util.List;

import com.spring.test.DAO.SongRepository;
import com.spring.test.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SongRestService {
	@Autowired
	private SongRepository songRepository;
	
	@RequestMapping(value="/songs" , method = RequestMethod.GET)
	public List<Song> getAll() {
		return songRepository.findAll(); 
	}
	
	@RequestMapping(value = "/songs/{id}", method = RequestMethod.GET)
	public Song get(@PathVariable("id") long id){
		return (Song) songRepository.findOne(id);
	}
	
	@RequestMapping(value = "/songs", method = RequestMethod.POST)
	public Song save(@RequestBody Song song){
		return (Song) songRepository.save(song);
	}
	
	@RequestMapping(value = "/songs/{id}", method = RequestMethod.PUT)
	public Song update(@RequestBody Song song){
		return (Song) songRepository.saveAndFlush(song);
	}
	
	@RequestMapping(value = "/songs/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id){
		songRepository.delete(id);
	}
}

