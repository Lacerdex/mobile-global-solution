package com.fiap.mobile.global_solution.service;

import com.fiap.mobile.global_solution.model.Sensor;
import com.fiap.mobile.global_solution.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public Sensor salvarSensor(Sensor sensor) {
        // Regra de Negócio Básica
        if (sensor.getStatus() == null) {
            sensor.setStatus("INATIVO");
        } else {
            sensor.setStatus(sensor.getStatus().toUpperCase());
        }
        return sensorRepository.save(sensor);
    }

    public List<Sensor> listarTodos() {
        return sensorRepository.findAll();
    }

    public Sensor buscarPorId(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    public List<Sensor> listarPorStatus(String status) {
        return sensorRepository.findByStatus(status.toUpperCase());
    }
}