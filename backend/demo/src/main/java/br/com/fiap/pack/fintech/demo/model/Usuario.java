package br.com.fiap.pack.fintech.demo.model;

import br.com.fiap.pack.fintech.demo.model.enums.Perfil;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "TB_USUARIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String logradouro;

    @Column(unique = true)
    private String cpf;

    @NotBlank
    private String senha;

    @Column(name = "SALDO_EM_CONTA")
    private Double saldoEmConta = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(name = "PERFIL", nullable = true)
    private Perfil perfil = Perfil.ROLE_USUARIO_COMUM;

    public Perfil getPerfil() {
        return perfil;
    }
    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }

    @Column(name = "PALAVRA_DE_AUTORIZACAO")
    private String palavraDeAutorizacao;
}