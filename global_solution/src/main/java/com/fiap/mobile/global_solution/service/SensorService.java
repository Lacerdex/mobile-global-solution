package com.fiap.mobile.global_solution.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiap.mobile.global_solution.model.Sensor;
import com.fiap.mobile.global_solution.model.enums.StatusSensor;
import com.fiap.mobile.global_solution.repository.SensorRepository;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    public Sensor salvarSensor(Sensor sensor) {
        // Regra de Negócio Básica
        if (sensor.getStatus() == null) {
            sensor.setStatus(StatusSensor.INATIVO); // Status padrão
        }
        return sensorRepository.save(sensor);
    }

    public List<Sensor> listarTodos() {
        return sensorRepository.findAll();
    }

    public Sensor buscarPorId(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    public List<Sensor> listarPorStatus(StatusSensor status) {
        return sensorRepository.findByStatus(status);
    }

    @Transactional
    public void deletarSensor(Long id) {
        sensorRepository.deleteById(id);
    }
}