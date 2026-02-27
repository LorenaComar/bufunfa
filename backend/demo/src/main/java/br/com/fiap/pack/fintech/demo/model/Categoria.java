package br.com.fiap.pack.fintech.demo.model;

import br.com.fiap.pack.fintech.demo.model.enums.TipoCategoria;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "TB_CATEGORIA")
@Data @NoArgsConstructor @AllArgsConstructor
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoCategoria tipoCategoria;
}