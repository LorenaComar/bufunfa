package br.com.fiap.pack.fintech.demo.service;

import br.com.fiap.pack.fintech.demo.model.Usuario;
import br.com.fiap.pack.fintech.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criarUsuario(Usuario novoUsuario) {
        Optional<Usuario> existente = usuarioRepository.encontrarPorEmail(novoUsuario.getEmail());
        if (existente.isPresent()) {
            throw new RuntimeException("Usuário com este e-mail já existe.");
        }
        return usuarioRepository.save(novoUsuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.encontrarPorId(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));
    }

    public List<Usuario> buscarPorEmailESenha(String email, String senha) {
        return usuarioRepository.buscarPorEmailESenha(email, senha);
    }

    public Usuario atualizarUsuario(Long id, Usuario dadosUsuario) {
        Usuario usuarioExistente = usuarioRepository.encontrarPorId(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));

        usuarioExistente.setNome(dadosUsuario.getNome());
        usuarioExistente.setEmail(dadosUsuario.getEmail());
        usuarioExistente.setLogradouro(dadosUsuario.getLogradouro());

        if (dadosUsuario.getSenha() != null && !dadosUsuario.getSenha().isEmpty()) {
            usuarioExistente.setSenha(dadosUsuario.getSenha());
        }

        return usuarioRepository.save(usuarioExistente);
    }

    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado com o ID: " + id);
        }
        usuarioRepository.deleteById(id); // Corrigido: usar deleteById do JpaRepository
    }
}