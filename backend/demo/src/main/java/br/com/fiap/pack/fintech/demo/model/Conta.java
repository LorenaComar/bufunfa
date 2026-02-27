package br.com.fiap.pack.fintech.demo.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TB_CONTA")
@Data @NoArgsConstructor @AllArgsConstructor

public class Conta {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "USUARIO_ID")
    private Usuario usuario;

    @NotBlank
    private String banco;

    @NotBlank
    private int agencia;

    @NotBlank
    private int numero;

    @NotNull
    private Double saldo = 0.0;

}