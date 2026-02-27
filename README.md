# 💸 Bufunfa – Fintech Fullstack

Aplicação **fullstack de gestão financeira** desenvolvida com **Java (Spring Boot)**, **Oracle Database** e **ReactJS**, estruturada com arquitetura em camadas e integração completa via APIs REST.

O sistema permite o gerenciamento de **contas, categorias e transações financeiras**, oferecendo ao usuário controle centralizado de entradas e saídas com navegação fluida e interface responsiva.

---

## 🎯 Objetivo do Projeto

Consolidar práticas de desenvolvimento fullstack aplicando:

- Arquitetura em camadas  
- Persistência relacional com Oracle  
- Construção de APIs REST  
- Integração frontend-backend  
- Estrutura SPA com React  

O projeto serve como base para evolução de funcionalidades voltadas a fintechs e sistemas de controle financeiro.

---

## 🎨 Funcionalidades Implementadas

- Autenticação (Login)
- Dashboard inicial
- CRUD completo de:
  - Usuário
  - Conta
  - Categoria
  - Transação
- Navegação SPA com React Router
- Página de erro personalizada
- Integração completa entre frontend e backend via REST

---

## 🧱 Arquitetura

O projeto foi estruturado seguindo boas práticas de separação de responsabilidades.

### 🔹 Backend (Spring Boot)

Arquitetura em camadas:

- **Model** – Entidades JPA
- **Repository** – Persistência com Spring Data JPA
- **Service** – Regras de negócio
- **Controller** – Endpoints REST

### 🌐 Endpoints REST

Implementação completa com verbos HTTP adequados:

- `GET` – Consulta de dados  
- `POST` – Criação  
- `PUT` – Atualização  
- `DELETE` – Remoção  

Integração com **Oracle Database** via **JPA/Hibernate**.

---

### 🔹 Frontend (React)

Aplicação SPA estruturada com:

- Componentização
- React Router DOM
- Hooks (`useState`, `useEffect`)
- Consumo de APIs REST via Fetch
- Interface responsiva com Bootstrap

---

## ⚙️ Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Maven
- Oracle SQL

### Frontend
- React (Vite)
- JavaScript
- React Router DOM
- Bootstrap

---

## 🚀 Como Executar o Projeto

### 🔧 Backend

1. Configure o arquivo `application.properties` com suas credenciais locais:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

2. Execute:

mvn spring-boot:run

Backend disponível em:

http://localhost:8080


### 💻 Frontend

npm install
npm run dev

Frontend disponível em:

http://localhost:5173

⚠️ Requisito: Node.js versão 20 ou superior.


### 🔑 Usuário de Teste

Email: douglas111@gmail.com

Senha: 123456
