package com.spring.test.DAO;

import com.spring.test.entities.Historique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoriqueRepository extends JpaRepository<Historique, Long> {

}