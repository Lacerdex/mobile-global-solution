package com.fiap.mobile.global_solution.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiap.mobile.global_solution.model.Alerta;
import com.fiap.mobile.global_solution.model.enums.AlertaGravidade;
import com.fiap.mobile.global_solution.repository.AlertaRepository;


@Service
public class AlertaService {

    @Autowired
    private AlertaRepository alertaRepository;

    public Alerta salvarAlerta(Alerta alerta) {
        // Regra de Negócio Básica
        if (alerta.getGravidade() == null) {
            return null; // Gravidade é obrigatória
        }
        return alertaRepository.save(alerta);
    }

    public List<Alerta> listarTodos() {
        return alertaRepository.findAll();
    }

    public Alerta buscarPorId(Long id) {
        return alertaRepository.findById(id).orElse(null);
    }

    public List<Alerta> listarPorGravidade(AlertaGravidade gravidade) {
        return alertaRepository.findByGravidade(gravidade);
    }

    @Transactional
    public void deletarAlerta(Long id) {
        alertaRepository.deleteById(id);
    }
}