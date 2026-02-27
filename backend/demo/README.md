# 💸 Bufunfa

O **Bufunfa** é uma aplicação **Full Stack** desenvolvida como projeto integrador da FIAP, unindo **Java com Spring Boot**, **Oracle Database** e **ReactJS** para proporcionar uma solução moderna e intuitiva de **gestão financeira pessoal**.

O objetivo principal é ajudar o usuário a **organizar suas finanças** de maneira prática e acessível, centralizando em um único sistema o cadastro de **contas**, **categorias** e **transações** (entradas e saídas).  
Diferente de um aplicativo bancário tradicional, o Bufunfa tem como foco o **autogerenciamento financeiro**, permitindo que cada usuário visualize sua saúde financeira em tempo real — sem complexidade e com total controle.

---

## 🧭 Visão Geral do Projeto

O **Bufunfa** foi projetado para que o usuário possa:

- Cadastrar suas **contas** (ex: carteira, banco, poupança).
- Criar e gerenciar **categorias de gastos** (ex: alimentação, transporte, lazer).
- Registrar **transações de entrada e saída** com data, valor e descrição.
- Consultar todos os lançamentos financeiros em um painel único.
- Editar ou excluir informações com facilidade.
- Navegar entre telas de forma fluida.

---

## 🧱 Arquitetura e Tecnologias

### 🔹 Backend

- **JDK 21 +**
- **Spring Boot**
- **Oracle Database (FIAP Cloud)**
- **Maven**

### 🔹 Frontend

- **ReactJS (Vite)**
- **Node.js (versão 20 ou superior)**
- **NPM**
- **Fetch API**
- **React Router DOM**
- **Bootstrap**
- **JSON Server (para simulação local)**

---

## ⚙️ Requisitos Técnicos

### 🔧 Backend (Spring Boot)

1. Criar **entidades (Model)** representando o domínio do projeto.
2. Implementar **Repository** com JPA para cada entidade.
3. Implementar **Service** com regras de negócio.
4. Criar **Controllers REST**
   - **GET** → Consultar
   - **POST** → Criar
   - **PUT** → Atualizar
   - **DELETE** → Deletar

### 💻 Frontend (React)

1. Estruturar o projeto com **componentização**.
2. Criar **rotas (SPA)** com `react-router-dom`.
3. Utilizar **hooks** (`useState`, `useEffect`) para controle de estado.
4. Criar páginas:
   - Login
   - Página inicial
   - Página de erro personalizada
   - CRUDs de Usuário, Conta, Categoria e Transação
5. Conectar o frontend ao backend via **APIs REST**.
6. Implementar **JSON Server** para simulação local de dados.

---

## 🧪 Como Executar o Projeto

### 🗄️ 1. Clonar o Repositório

git clone https://github.com/seuusuario/bufunfa.git
cd bufunfa

---

### 2. Executar o Backend (Java / Spring Boot)

1. Certifique-se de ter o Java 17+ e o Maven instalados.

2. Configure o arquivo application.properties com as credenciais do Oracle:

spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=RM566420
spring.datasource.password=210105
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

---

3. No diretório /backend, execute:

mvn spring-boot:run

O backend estará disponível em:
📍 http://localhost:8080

---

### 🧩 3. Executar o Frontend (React)

1. Vá até o diretório do projeto React:

cd meu-projeto-react

2. Instale as dependências:

npm install

3. Instale o JSON Server globalmente (caso ainda não tenha):

npm install -g json-server

4. Inicie o JSON Server (caso use um arquivo db.json):

json-server --watch db.json --port 3001

5. Inicie o frontend

npm run dev

---

O frontend estará disponível em:
🌐 http://localhost:5173

⚠️ Requisito: O Node.js deve ser versão 20 ou superior para rodar corretamente.

🔑 Usuário de Teste

### Email: douglas111@gmail.com

### Senha: 123456

📚 Autores

Projeto desenvolvido por alunos da FIAP

- Douglas Ferreira Giatti
- Eduardo de Araújo Favaron
- Kauany Soares Rodrigues Violin
- Lorena Santos Comar
  📅 Ano: 2025

🏁 Conclusão

O projeto Bufunfa consolida as principais tecnologias aprendidas ao longo do curso, integrando Java, Spring Boot, Oracle e ReactJS em um ambiente completo de desenvolvimento Full Stack.
Ele reflete as boas práticas de arquitetura, componentização, versionamento e consumo de APIs REST, sendo uma base sólida para evoluções futuras no contexto de fintechs.
