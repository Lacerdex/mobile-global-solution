package com.fiap.mobile.global_solution.repository;

import com.fiap.mobile.global_solution.model.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    // Busca customizada automática pelo Spring Data
    List<Alerta> findByGravidade(String gravidade);
}