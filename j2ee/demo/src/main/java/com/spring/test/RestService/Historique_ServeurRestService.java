package com.spring.test.RestService;

import java.util.List;

import com.spring.test.DAO.Historique_ServeurRepository;
import com.spring.test.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Historique_ServeurRestService {
	@Autowired
	private Historique_ServeurRepository historique_ServeurRepository;
	
	@RequestMapping(value="/historique_serveurs" , method = RequestMethod.GET)
	public List<Historique_Serveur> getAll() {
		return historique_ServeurRepository.findAll(); 
	}
	
	@RequestMapping(value = "/historique_serveurs/{id}", method = RequestMethod.GET)
	public Historique_Serveur get(@PathVariable("id") long id){
		return (Historique_Serveur) historique_ServeurRepository.findOne(id);
	}
	
	@RequestMapping(value = "/historique_serveurs", method = RequestMethod.POST)
	public Historique_Serveur save(@RequestBody Historique_Serveur historique_Serveur){
		return (Historique_Serveur) historique_ServeurRepository.save(historique_Serveur);
	}
	
	@RequestMapping(value = "/historique_serveurs/{id}", method = RequestMethod.PUT)
	public Historique_Serveur update(@RequestBody Historique_Serveur historique_Serveur, @PathVariable("id") long id){
		historique_Serveur.setId(id);
		return (Historique_Serveur) historique_ServeurRepository.saveAndFlush(historique_Serveur);
	}
	
	@RequestMapping(value = "/historique_serveurs/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") long id){
		historique_ServeurRepository.delete(id);
	}
}
