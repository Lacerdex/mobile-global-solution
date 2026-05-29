package com.fiap.mobile.global_solution.service;

import com.fiap.mobile.global_solution.model.Evento;
import com.fiap.mobile.global_solution.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public Evento salvarEvento(Evento evento) {
        // Regra de Negócio Básica
        if (evento.getTipo() == null) {
            evento.setTipo("GENÉRICO");
        }
        return eventoRepository.save(evento.toUpperCase());
    }

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Evento buscarPorId(Long id) {
        return eventoRepository.findById(id).orElse(null);
    }

    public List<Evento> listarPorTipo(String tipo) {
        return eventoRepository.findByTipo(tipo.toUpperCase());
    }
}