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

import com.fiap.mobile.global_solution.model.Evento;
import com.fiap.mobile.global_solution.service.EventoService;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*") // Permite que o app mobile acesse sem erros de CORS
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @PostMapping
    public ResponseEntity<Evento> criarEvento(@RequestBody Evento evento) {
        Evento novoEvento = eventoService.salvarEvento(evento);
        return new ResponseEntity<>(novoEvento, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<Evento>> filtrarPorTipo(@RequestParam String tipo) {
        return ResponseEntity.ok(eventoService.listarPorTipo(tipo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarPorId(@PathVariable Long id) {
        Evento evento = eventoService.buscarPorId(id);
        if (evento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(evento);
    }
}