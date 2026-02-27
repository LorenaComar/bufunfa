package br.com.fiap.pack.fintech.demo.service;

import br.com.fiap.pack.fintech.demo.model.Conta;
import br.com.fiap.pack.fintech.demo.repository.ContaRepository;
import br.com.fiap.pack.fintech.demo.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    public Conta criarConta(Conta novaConta) {

        Optional<Conta> existente = contaRepository.encontrarPorAgenciaNumero(novaConta.getAgencia(), novaConta.getNumero());
        if (existente.isPresent()) {
            throw new RuntimeException("Conta com esta agência e número já existe.");
        }

        if (novaConta.getSaldo() == null || novaConta.getSaldo() < 0.0) {
            if (novaConta.getSaldo() != null && novaConta.getSaldo() < 0.0) {
                throw new IllegalArgumentException("O saldo inicial não pode ser negativo.");
            }
            novaConta.setSaldo(0.0);
        }

        return contaRepository.save(novaConta);
    }

    public Optional<Conta> buscarContaPorCpfTitular(String cpf) {
        return contaRepository.encontrarPeloCpfUsuario(cpf);
    }

    public Optional<Conta> encontrarPorId(Long id) {
        return contaRepository.encontrarPorId(id);
    }

    //não vai ter como editar a conta, somente deletar!!!
    @Transactional
    public void deletarConta(Long id) {
        Conta conta = encontrarPorId(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com o ID: " + id));
        if (!transacaoRepository.buscarTransacaoPorId(id).isEmpty()) {
            throw new IllegalStateException("A conta possui histórico de transações e não pode ser excluída. Por favor, exclua as transações antes de excluir a conta.");
        }

        contaRepository.delete(conta);
    }
}