package com.gestaoestoque.veiculos.service;

import com.gestaoestoque.veiculos.model.Modelo;
import com.gestaoestoque.veiculos.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModeloService {

    @Autowired
    private ModeloRepository modeloRepository;

    public List<Modelo> listarTodos() {
        return modeloRepository.findAll();
    }

    public Optional<Modelo> buscarPorId(Long id) {
        return modeloRepository.findById(id);
    }

    public Modelo salvar(Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    public void deletar(Long id) {
        modeloRepository.deleteById(id);
    }
}