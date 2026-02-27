package br.com.fiap.pack.fintech.demo.service;

import br.com.fiap.pack.fintech.demo.model.Categoria;
import br.com.fiap.pack.fintech.demo.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria criarCategoria(Categoria novaCategoria) {

        Categoria existente = (Categoria) categoriaRepository.buscarNomeCategoria(novaCategoria.getNome());
        if (existente != null) {
            throw new RuntimeException("Categoria com o nome '" + novaCategoria.getNome() + "' já existe.");
        }
        return categoriaRepository.save(novaCategoria);
    }

    public List<Categoria> buscarTodasCategorias() {
        return categoriaRepository.findAll();
    }

    public List<Categoria> buscarPorTipoCategoria(String tipo) {
        return categoriaRepository.buscarTipoCategoria(tipo.toUpperCase());
    }
}