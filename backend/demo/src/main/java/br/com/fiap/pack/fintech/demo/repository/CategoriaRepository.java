package br.com.fiap.pack.fintech.demo.repository;

import br.com.fiap.pack.fintech.demo.model.Categoria;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT c FROM Categoria c WHERE c.nome = :nome")
    List<Categoria> buscarNomeCategoria(@NotBlank String nome);

    @Query("SELECT c FROM Categoria c WHERE c.tipoCategoria = :tipo")
    List<Categoria> buscarTipoCategoria(@NotBlank String tipo);

}