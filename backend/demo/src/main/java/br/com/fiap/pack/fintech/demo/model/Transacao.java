package br.com.fiap.pack.fintech.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TB_TRANSACOES")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {

    public enum TipoTransacao {
        CREDITO, DEBITO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CONTA_ID")
    private Conta conta;

    @NotNull
    private Double valor;

    @NotBlank
    private String descricao;

    @NotNull
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoTransacao tipo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CATEGORIA_ID")
    private Categoria categoria;

}