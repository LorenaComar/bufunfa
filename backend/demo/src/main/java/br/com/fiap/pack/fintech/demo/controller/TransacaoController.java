package br.com.fiap.pack.fintech.demo.controller;

import br.com.fiap.pack.fintech.demo.model.Transacao;
import br.com.fiap.pack.fintech.demo.model.Usuario;
import br.com.fiap.pack.fintech.demo.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "http://localhost:5173")
public class TransacaoController {

    private final TransacaoService transacaoService;

    @Autowired
    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @PostMapping("/entrada")
    public ResponseEntity<?> registrarEntrada(@RequestBody Transacao entrada) {
        try {
            Transacao transacaoRegistrada = transacaoService.registrarEntrada(entrada);
            return new ResponseEntity<>(transacaoRegistrada, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/saida")
    public ResponseEntity<?> registrarSaida(@RequestBody Transacao saida) {
        try {
            Transacao transacaoRegistrada = transacaoService.registrarSaida(saida);
            return new ResponseEntity<>(transacaoRegistrada, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

        @PutMapping("/{id}")
    public ResponseEntity<?> atualizarTransacao(@PathVariable Long id, @RequestBody Transacao transacaoAtualizada) {
        try {
            Transacao transacao = transacaoService.atualizarTransacao(id, transacaoAtualizada);
            return ResponseEntity.ok(transacao);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

        @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarTransacao(@PathVariable Long id) {
        try {
            transacaoService.deletarTransacao(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}