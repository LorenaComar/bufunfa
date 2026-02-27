package br.com.fiap.pack.fintech.demo.model.enums;

/**

 Define os possíveis papéis ou perfis de acesso do usuário no sistema.
 É uma prática recomendada usar o prefixo "ROLE_" em sistemas Spring Security.*/

public enum Perfil {
    ROLE_USUARIO_COMUM,
    ROLE_ADMINISTRADOR,

}