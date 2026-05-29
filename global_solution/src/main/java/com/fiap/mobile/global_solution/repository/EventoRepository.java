package com.fiap.mobile.global_solution.repository;

import com.fiap.mobile.global_solution.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    // Busca customizada automática pelo Spring Data
    List<Evento> findByTipo(String tipo);
}