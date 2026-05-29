package com.fiap.mobile.global_solution.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.mobile.global_solution.model.Sensor;
import com.fiap.mobile.global_solution.service.SensorService;

@RestController
@RequestMapping("/api/sensores")
@CrossOrigin(origins = "*") // Permite que o app mobile acesse sem erros de CORS
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @PostMapping
    public ResponseEntity<Sensor> criarSensor(@RequestBody Sensor sensor) {
        Sensor novoSensor = sensorService.salvarSensor(sensor);
        return new ResponseEntity<>(novoSensor, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Sensor>> listarSensores() {
        return ResponseEntity.ok(sensorService.listarTodos());
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Sensor>> filtrarPorStatus(@RequestParam String status) {
        return ResponseEntity.ok(sensorService.listarPorStatus(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sensor> buscarPorId(@PathVariable Long id) {
        Sensor sensor = sensorService.buscarPorId(id);
        if (sensor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sensor);
    }
}