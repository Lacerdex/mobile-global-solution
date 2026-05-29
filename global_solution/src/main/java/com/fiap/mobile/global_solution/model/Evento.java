package com.fiap.mobile.global_solution.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_eventos")
@Data
@NoArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome; // Ex: "Teste de Propulsão", "Manobra Orbital"

    @Column(nullable = false)
    private String tipo; // Ex: "TESTE", "MANOBRA", "FALHA"

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime dataHora;
}