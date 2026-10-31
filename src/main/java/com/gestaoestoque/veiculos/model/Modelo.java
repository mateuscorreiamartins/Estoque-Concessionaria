package com.gestaoestoque.veiculos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_modelo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Modelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 50)
    private String categoria;

    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;
}
