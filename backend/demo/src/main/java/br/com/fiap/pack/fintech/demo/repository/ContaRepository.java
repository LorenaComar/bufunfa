package br.com.fiap.pack.fintech.demo.repository;

import br.com.fiap.pack.fintech.demo.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ContaRepository extends JpaRepository<Conta, Long> {

    @Query("SELECT c FROM Conta c WHERE c.usuario.cpf = :cpf")
    Optional<Conta> encontrarPeloCpfUsuario(@Param("cpf") String cpf);

    @Query("SELECT c FROM Conta c WHERE c.agencia = :agencia AND c.numero = :numero")
    Optional<Conta> encontrarPorAgenciaNumero(@Param("agencia") int agencia, @Param("numero") int numero);

    @Query("SELECT c FROM Conta c WHERE c.id = :id")
    Optional<Conta> encontrarPorId(@Param("id") Long id);

}