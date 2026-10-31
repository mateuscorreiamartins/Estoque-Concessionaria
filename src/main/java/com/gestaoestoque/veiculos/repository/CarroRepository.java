package com.gestaoestoque.veiculos.repository;

import com.gestaoestoque.veiculos.model.Carro;
import com.gestaoestoque.veiculos.model.StatusVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {

    // Buscar carros apenas por status (ex: apenas DISPONIVEL)
    List<Carro> findByStatus(StatusVeiculo status);

    // Buscar por Marca ID
    List<Carro> findByMarcaId(Long marcaId);

    // Buscar por Modelo ID
    List<Carro> findByModeloId(Long modeloId);

    // Buscar por faixa de preço (Preço mínimo e máximo)
    List<Carro> findByPrecoVendaBetween(BigDecimal precoMin, BigDecimal precoMax);

    // Filtro completo combinado (Marca, Modelo, Ano, Faixa de Preço e Status)
    @Query("SELECT c FROM Carro c WHERE " +
            "(:marcaId IS NULL OR c.marca.id = :marcaId) AND " +
            "(:modeloId IS NULL OR c.modelo.id = :modeloId) AND " +
            "(:ano IS NULL OR c.anoFabricacao = :ano) AND " +
            "(:precoMin IS NULL OR c.precoVenda >= :precoMin) AND " +
            "(:precoMax IS NULL OR c.precoVenda <= :precoMax) AND " +
            "(:status IS NULL OR c.status = :status)")
    List<Carro> filtrarVeiculos(
            @Param("marcaId") Long marcaId,
            @Param("modeloId") Long modeloId,
            @Param("ano") Integer ano,
            @Param("precoMin") BigDecimal precoMin,
            @Param("precoMax") BigDecimal precoMax,
            @Param("status") StatusVeiculo status
    );
}