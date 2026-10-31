package com.gestaoestoque.veiculos.controller;

import com.gestaoestoque.veiculos.model.Carro;
import com.gestaoestoque.veiculos.model.StatusVeiculo;
import com.gestaoestoque.veiculos.service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/carros")
@CrossOrigin(origins = "*")
public class CarroController {

    @Autowired
    private CarroService carroService;

    // 1. Listar todos os carros (ou filtrar se passar parâmetros na URL)
    @GetMapping
    public ResponseEntity<List<Carro>> listar(
            @RequestParam(required = false) Long marcaId,
            @RequestParam(required = false) Long modeloId,
            @RequestParam(required = false) Integer ano,
            @RequestParam(required = false) BigDecimal precoMin,
            @RequestParam(required = false) BigDecimal precoMax,
            @RequestParam(required = false) StatusVeiculo status
    ) {
        if (marcaId != null || modeloId != null || ano != null || precoMin != null || precoMax != null || status != null) {
            return ResponseEntity.ok(carroService.filtrarVeiculos(marcaId, modeloId, ano, precoMin, precoMax, status));
        }
        return ResponseEntity.ok(carroService.listarTodos());
    }

    // 2. Buscar um carro específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<Carro> buscarPorId(@PathVariable Long id) {
        return carroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Cadastrar um novo carro no estoque
    @PostMapping
    public ResponseEntity<Carro> salvar(@RequestBody Carro carro) {
        Carro novoCarro = carroService.salvar(carro);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCarro);
    }

    // 4. Atualizar os dados de um carro existente
    @PutMapping("/{id}")
    public ResponseEntity<Carro> atualizar(@PathVariable Long id, @RequestBody Carro carro) {
        return carroService.buscarPorId(id)
                .map(carroExistente -> {
                    carro.setId(carroExistente.getId());
                    return ResponseEntity.ok(carroService.salvar(carro));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. Eliminar um carro do estoque
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (carroService.buscarPorId(id).isPresent()) {
            carroService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}