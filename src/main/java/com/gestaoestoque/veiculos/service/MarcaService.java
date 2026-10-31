package com.gestaoestoque.veiculos.service;

import com.gestaoestoque.veiculos.model.Marca;
import com.gestaoestoque.veiculos.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }

    public Optional<Marca> buscarPorId(Long id) {
        return marcaRepository.findById(id);
    }

    public Marca salvar(Marca marca) {
        return marcaRepository.save(marca);
    }

    public void deletar(Long id) {
        marcaRepository.deleteById(id);
    }
}