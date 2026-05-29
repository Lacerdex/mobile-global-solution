package com.fiap.mobile.global_solution.service;

import com.fiap.mobile.global_solution.model.Alerta;
import com.fiap.mobile.global_solution.repository.AlertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AlertaService {

    @Autowired
    private AlertaRepository alertaRepository;

    public Alerta salvarAlerta(Alerta alerta) {
        // Regra de Negócio Básica
        if (alerta.getGravidade() == null) {
            alerta.setGravidade("INFO");
        } else {
            alerta.setGravidade(alerta.getGravidade().toUpperCase());
        }
        return alertaRepository.save(alerta);
    }

    public List<Alerta> listarTodos() {
        return alertaRepository.findAll();
    }

    public Alerta buscarPorId(Long id) {
        return alertaRepository.findById(id).orElse(null);
    }

    public List<Alerta> listarPorGravidade(String gravidade) {
        return alertaRepository.findByGravidade(gravidade.toUpperCase());
    }
}