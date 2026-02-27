package br.com.fiap.pack.fintech.demo.controller;

import br.com.fiap.pack.fintech.demo.model.Conta;
import br.com.fiap.pack.fintech.demo.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "http://localhost:5173")
public class ContaController {

    @Autowired
    private ContaService contaService;

    // POST - Criar conta
    @PostMapping
    public ResponseEntity<?> criarConta(@RequestBody Conta novaConta) {
        try {
            Conta contaCriada = contaService.criarConta(novaConta);
            return ResponseEntity.ok(contaCriada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET - Buscar conta por CPF do titular
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> buscarPorCpf(@PathVariable String cpf) {
        try {
            Optional<Conta> conta = contaService.buscarContaPorCpfTitular(cpf);
            return conta.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao buscar conta: " + e.getMessage());
        }
    }

    // GET - Buscar conta por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<Conta> conta = contaService.encontrarPorId(id);
            return conta.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao buscar conta: " + e.getMessage());
        }
    }

    // PUT - Atualizar conta (não permitido)
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarConta(@PathVariable Long id) {
        return ResponseEntity.status(405).body("Atualização de conta não é permitida.");
    }

    // DELETE - Deletar conta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarConta(@PathVariable Long id) {
        try {
            contaService.deletarConta(id);
            return ResponseEntity.ok("Conta deletada com sucesso!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao deletar conta");
        }
    }
}