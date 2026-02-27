package br.com.fiap.pack.fintech.demo.repository;

import br.com.fiap.pack.fintech.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Optional<Usuario> encontrarPorEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
    List<Usuario> buscarPorEmailESenha(String email, String senha);

    @Query("SELECT u FROM Usuario u WHERE u.id = :id")
    Optional<Usuario> encontrarPorId(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Usuario u SET u.nome = :nome, u.email = :email, u.senha = :senha WHERE u.id = :id")
    int atualizarUsuario(Long id, String nome, String email, String senha);
}