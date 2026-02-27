
package br.com.fiap.pack.fintech.demo.repository;

import br.com.fiap.pack.fintech.demo.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    @Query("SELECT t FROM Transacao t WHERE t.categoria.nome = :categoria")
    List<Transacao> encontrarPelaCategoria(@Param("categoria") String categoria);

    @Query("SELECT t FROM Transacao t WHERE t.conta.id = :contaId")
    List<Transacao> buscarTransacaoPorId(@Param("contaId") Long contaId);

}