package com.spring.test.RestService;

import java.util.List;

import com.spring.test.DAO.HistoriqueRepository;
import com.spring.test.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HistoriqueRestService {
	@Autowired
	private HistoriqueRepository historiqueRepository;
	
	@RequestMapping(value="/historiques" , method = RequestMethod.GET)
	public List<Historique> getAll() {
		return historiqueRepository.findAll(); 
	}
	
	@RequestMapping(value = "/historiques/{id}", method = RequestMethod.GET)
	public Historique get(@PathVariable("id") long id){
		return (Historique) historiqueRepository.findOne(id);
	}
	
	@RequestMapping(value = "/historiques", method = RequestMethod.POST)
	public Historique save(@RequestBody Historique historique){
		return (Historique) historiqueRepository.save(historique);
	}
	
	@RequestMapping(value = "/historiques/{id}", method = RequestMethod.PUT)
	public Historique update(@RequestBody Historique historique, @PathVariable("id") long id){
		historique.setId(id);
		return (Historique) historiqueRepository.saveAndFlush(historique);
	}
	
	@RequestMapping(value = "/historiques/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id){
		historiqueRepository.delete(id);
	}
}
