package com.fiap.mobile.global_solution.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fiap.mobile.global_solution.model.enums.StatusSensor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_sensores")
@Data
@NoArgsConstructor
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String localizacao;

    @Column(nullable = false)
    private String tipo; // Ex: "Temperatura", "Pressão", "Vibração"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSensor status; // Ex: OK, ALERTA, CRITICO, INATIVO

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime dataHora;
}