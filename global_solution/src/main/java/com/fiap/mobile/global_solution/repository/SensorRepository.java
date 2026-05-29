package com.fiap.mobile.global_solution.repository;

import com.fiap.mobile.global_solution.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    // Busca customizada automática pelo Spring Data
    List<Sensor> findByStatus(String status);
}