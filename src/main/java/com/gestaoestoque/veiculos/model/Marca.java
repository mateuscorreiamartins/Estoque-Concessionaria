package com.gestaoestoque.veiculos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_marca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nomeMarca;

    @Column(length = 100)
    private String paisOrigem;
}
