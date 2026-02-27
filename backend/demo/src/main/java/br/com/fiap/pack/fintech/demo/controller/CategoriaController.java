package br.com.fiap.pack.fintech.demo.controller;

import br.com.fiap.pack.fintech.demo.model.Categoria;
import br.com.fiap.pack.fintech.demo.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // POST - Criar nova categoria
    @PostMapping
    public ResponseEntity<?> criarCategoria(@RequestBody Categoria novaCategoria) {
        try {
            Categoria categoriaCriada = categoriaService.criarCategoria(novaCategoria);
            return ResponseEntity.ok(categoriaCriada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao criar categoria");
        }
    }

    // GET - Buscar todas as categorias
    @GetMapping
    public ResponseEntity<?> buscarTodasCategorias() {
        try {
            List<Categoria> categorias = categoriaService.buscarTodasCategorias();
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao buscar categorias");
        }
    }

    // GET - Buscar categorias por tipo (RECEITA ou DESPESA)
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<?> buscarPorTipo(@PathVariable String tipo) {
        try {
            List<Categoria> categorias = categoriaService.buscarPorTipoCategoria(tipo);
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao buscar categorias por tipo");
        }
    }

    // PUT - Atualização não permitida
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCategoria(@PathVariable Long id) {
        return ResponseEntity.status(405).body("Atualização de categoria não é permitida.");
    }

    // DELETE - Exclusão não permitida
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarCategoria(@PathVariable Long id) {
        return ResponseEntity.status(405).body("Exclusão de categoria não é permitida.");
    }
}