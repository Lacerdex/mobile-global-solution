package com.fiap.mobile.global_solution.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fiap.mobile.global_solution.model.Alerta;
import com.fiap.mobile.global_solution.model.enums.AlertaGravidade;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    // Busca customizada automática pelo Spring Data
    List<Alerta> findByGravidade(AlertaGravidade gravidade);
}