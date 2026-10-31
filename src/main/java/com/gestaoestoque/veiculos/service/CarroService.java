package com.gestaoestoque.veiculos.service;

import com.gestaoestoque.veiculos.model.Carro;
import com.gestaoestoque.veiculos.model.StatusVeiculo;
import com.gestaoestoque.veiculos.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CarroService {

    @Autowired
    private CarroRepository carroRepository;

    // Listar todos os carros no estoque
    public List<Carro> listarTodos() {
        return carroRepository.findAll();
    }

    // Buscar um carro específico pelo ID
    public Optional<Carro> buscarPorId(Long id) {
        return carroRepository.findById(id);
    }

    // Salvar ou Atualizar um carro
    public Carro salvar(Carro carro) {
        return carroRepository.save(carro);
    }

    // Eliminar um carro pelo ID
    public void deletar(Long id) {
        carroRepository.deleteById(id);
    }

    // Filtro avançado exigido nos requisitos do projeto
    public List<Carro> filtrarVeiculos(Long marcaId, Long modeloId, Integer ano,
                                       BigDecimal precoMin, BigDecimal precoMax, StatusVeiculo status) {
        return carroRepository.filtrarVeiculos(marcaId, modeloId, ano, precoMin, precoMax, status);
    }
}