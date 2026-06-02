package com.fiap.mobile.global_solution.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiap.mobile.global_solution.model.Evento;
import com.fiap.mobile.global_solution.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public Evento salvarEvento(Evento evento) {
        // Regra de Negócio Básica
        if (evento.getTipo() == null || evento.getTipo().isBlank()) {
            evento.setTipo("GENÉRICO");
        }
        else {
            evento.setTipo(evento.getTipo().toUpperCase());
        }

        return eventoRepository.save(evento);
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

    @Transactional
    public void deletarEvento(Long id) {
        eventoRepository.deleteById(id);
    }
}