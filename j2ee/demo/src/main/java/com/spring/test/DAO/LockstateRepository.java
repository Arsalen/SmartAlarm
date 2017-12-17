package com.spring.test.DAO;

import com.spring.test.entities.Lockstate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LockstateRepository extends JpaRepository<Lockstate, Long> {

}