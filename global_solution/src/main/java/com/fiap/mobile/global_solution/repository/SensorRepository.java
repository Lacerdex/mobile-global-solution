package com.fiap.mobile.global_solution.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fiap.mobile.global_solution.model.Sensor;
import com.fiap.mobile.global_solution.model.enums.StatusSensor;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    // Busca customizada automática pelo Spring Data
    List<Sensor> findByStatus(StatusSensor status);
}