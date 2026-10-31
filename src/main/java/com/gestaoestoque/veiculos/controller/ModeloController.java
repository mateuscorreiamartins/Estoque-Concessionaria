package com.gestaoestoque.veiculos.controller;

import com.gestaoestoque.veiculos.model.Modelo;
import com.gestaoestoque.veiculos.service.ModeloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modelos")
@CrossOrigin(origins = "*")
public class ModeloController {

    @Autowired
    private ModeloService modeloService;

    @GetMapping
    public ResponseEntity<List<Modelo>> listar() {
        return ResponseEntity.ok(modeloService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modelo> buscarPorId(@PathVariable Long id) {
        return modeloService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Modelo> salvar(@RequestBody Modelo modelo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(modeloService.salvar(modelo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modelo> atualizar(@PathVariable Long id, @RequestBody Modelo modelo) {
        return modeloService.buscarPorId(id)
                .map(modeloExistente -> {
                    modelo.setId(modeloExistente.getId());
                    return ResponseEntity.ok(modeloService.salvar(modelo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (modeloService.buscarPorId(id).isPresent()) {
            modeloService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}