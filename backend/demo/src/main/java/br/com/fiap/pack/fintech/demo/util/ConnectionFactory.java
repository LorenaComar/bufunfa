package br.com.fiap.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    // URL padrão de conexão com o banco Oracle
    private static final String DEFAULT_URL = "jdbc:oracle:thin:@//oracle.fiap.com.br:1521/ORCL";

    // Pega credenciais das variáveis de ambiente ou usa valores padrão
    private static final String URL  = System.getenv().getOrDefault("DB_URL", DEFAULT_URL);
    private static final String USER = System.getenv().getOrDefault("DB_USER", "RM566420");
    private static final String PASS = System.getenv().getOrDefault("DB_PASS", "210105");

    // ✅ FUNÇÃO: Cria e retorna conexão com o banco de dados
    public static Connection getConnection() throws SQLException {
        try {
            // Carrega o driver JDBC do Oracle
            Class.forName("oracle.jdbc.OracleDriver");
        } catch (ClassNotFoundException e) {
            System.err.println("⚠️ Driver Oracle não encontrado no classpath (verifique o pom.xml).");
        }

        System.out.println("Conectando em: " + URL + " com usuário: " + USER);
        // ✅ Cria a conexão usando DriverManager
        return DriverManager.getConnection(URL, USER, PASS);
    }
}