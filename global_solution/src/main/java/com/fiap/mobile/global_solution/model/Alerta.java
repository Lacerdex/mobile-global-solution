package com.fiap.mobile.global_solution.model;

import java.time.LocalDateTime;

import com.fiap.mobile.global_solution.model.enums.AlertaGravidade;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertaGravidade gravidade; // Ex: "CRITICO", "ALERTA", "INFO"

    private LocalDateTime dataHora = LocalDateTime.now();
}