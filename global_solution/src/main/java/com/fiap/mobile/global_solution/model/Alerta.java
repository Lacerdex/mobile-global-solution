package com.fiap.mobile.global_solution.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_alertas")
@Data
@NoArgsConstructor
public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String componente; // Ex: "Propulsor B", "Bateria Principal"

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String gravidade; // Ex: "CRITICO", "ALERTA", "INFO"

    private LocalDateTime dataHora = LocalDateTime.now();
}