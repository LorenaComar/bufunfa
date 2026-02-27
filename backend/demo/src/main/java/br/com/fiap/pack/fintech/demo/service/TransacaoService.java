package br.com.fiap.pack.fintech.demo.service;

import br.com.fiap.pack.fintech.demo.model.Conta;
import br.com.fiap.pack.fintech.demo.model.Transacao;
import br.com.fiap.pack.fintech.demo.repository.ContaRepository;
import br.com.fiap.pack.fintech.demo.repository.TransacaoRepository;
import br.com.fiap.pack.fintech.demo.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ContaService contaService;


    @Transactional
    public Transacao registrarEntrada(Transacao entrada) {
        if (entrada.getValor() == null || entrada.getValor() <= 0) {
            throw new IllegalArgumentException("Valor da entrada deve ser positivo.");
        }
        return cadastrar(entrada);
    }


    @Transactional
    public Transacao registrarSaida(Transacao saida) {
        if (saida.getValor() == null || saida.getValor() <= 0) {
            throw new IllegalArgumentException("Valor da saída deve ser positivo.");
        }

        saida.setValor(-saida.getValor());

        return cadastrar(saida);
    }


    @Transactional
    private Transacao cadastrar(Transacao novaTransacao) {

        if (novaTransacao.getConta() == null || novaTransacao.getConta().getId() == null) {
            throw new IllegalArgumentException("A transação deve estar vinculada a uma Conta válida.");
        }
        if (novaTransacao.getCategoria() == null || novaTransacao.getCategoria().getId() == null) {
            throw new IllegalArgumentException("A transação deve ter uma Categoria.");
        }

        Conta conta = contaService.encontrarPorId(novaTransacao.getConta().getId())
                .orElseThrow(() -> new RuntimeException("Conta não encontrada."));

        categoriaRepository.findById(novaTransacao.getCategoria().getId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada."));

        if (novaTransacao.getValor() < 0 && conta.getSaldo() + novaTransacao.getValor() < 0) {
            throw new IllegalStateException("Saldo insuficiente para realizar esta transação.");
        }

        conta.setSaldo(conta.getSaldo() + novaTransacao.getValor());

        novaTransacao.setDataHora(LocalDateTime.now());

        contaRepository.save(conta);

        return transacaoRepository.save(novaTransacao);
    }


    // Metodo GET (Consultar por ID)
    public Transacao encontrarPorId(Long id) {
        return transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada com o ID: " + id));
    }

    public List<Transacao> buscarExtratoPorConta(Long contaId) {
        // CORREÇÃO:
        // 1. Use o metodo 'encontrarPorId' (em vez de 'buscarContaPorId')
        // 2. Verifique se a conta existe antes de buscar o extrato.
        contaService.encontrarPorId(contaId)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com o ID: " + contaId));

        return transacaoRepository.buscarTransacaoPorId(contaId);
    }

    @Transactional
public Transacao atualizarTransacao(Long id, Transacao transacaoAtualizada) {
    Transacao transacaoExistente = encontrarPorId(id);

    Conta conta = contaService.encontrarPorId(transacaoExistente.getConta().getId())
            .orElseThrow(() -> new RuntimeException("Conta associada não encontrada."));

    // Reverte o saldo da transação anterior
    conta.setSaldo(conta.getSaldo() - transacaoExistente.getValor());

    // Aplica o novo valor
    if (transacaoAtualizada.getValor() == null || transacaoAtualizada.getValor() == 0) {
        throw new IllegalArgumentException("Valor da transação deve ser diferente de zero.");
    }

    if (transacaoAtualizada.getValor() < 0 && conta.getSaldo() + transacaoAtualizada.getValor() < 0) {
        throw new IllegalStateException("Saldo insuficiente para atualizar esta transação.");
    }

    conta.setSaldo(conta.getSaldo() + transacaoAtualizada.getValor());

    transacaoExistente.setValor(transacaoAtualizada.getValor());
    transacaoExistente.setDescricao(transacaoAtualizada.getDescricao());
    transacaoExistente.setTipo(transacaoAtualizada.getTipo());
    transacaoExistente.setDataHora(LocalDateTime.now());

    if (transacaoAtualizada.getCategoria() != null) {
        categoriaRepository.findById(transacaoAtualizada.getCategoria().getId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada."));
        transacaoExistente.setCategoria(transacaoAtualizada.getCategoria());
    }

    contaRepository.save(conta);
    return transacaoRepository.save(transacaoExistente);
}

    @Transactional
    public void deletarTransacao(Long id) {
        Transacao transacao = encontrarPorId(id);

        Optional<Conta> contaOpt = contaService.encontrarPorId(transacao.getConta().getId());

        if (contaOpt.isPresent()) {
            Conta conta = contaOpt.get();

            conta.setSaldo(conta.getSaldo() - transacao.getValor());

            contaRepository.save(conta);
            transacaoRepository.delete(transacao);

        } else {
            throw new RuntimeException("Conta associada à transação não foi encontrada.");
        }
    }
}