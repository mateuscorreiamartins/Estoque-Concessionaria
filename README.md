# Gestão de Estoque de Veículos

> Sistema web completo para gestão de estoque e concessionária de veículos, desenvolvido com **Java (Spring Boot)** no backend, **MySQL** como banco de dados e uma interface gráfica no frontend.

---

## Sobre o Projeto

Este projeto foi desenvolvido como parte do trabalho prático da disciplina de **Programação Orientada a Objetos**. O objetivo principal é resolver o problema de desorganização no controle de veículos de uma concessionária, permitindo o gerenciamento eficiente de marcas, modelos e automóveis através de uma **API REST** estruturada.

---

## Tecnologias Utilizadas

### Backend
* **Java** (JDK 25)
* **Spring Boot** (Spring Web, Spring Data JPA)
* **Hibernate** (Mapeamento Objeto-Relacional - ORM)
* **MySQL** (Banco de dados relacional)
* **Maven** (Gerenciador de dependências)
* **Springdoc OpenAPI / Swagger UI** (Documentação interativa da API)

### Frontend
* **HTML5** & **CSS3** (Design customizado estilo SaaS, fonte Inter, layout responsivo)
* **JavaScript (ES6+)** (Consumo da API REST via Fetch API assíncrono)

---

## Principais Funcionalidades

- [x] **Cadastro e Gestão de Veículos**: Inclusão de novos automóveis com marca, modelo, ano, cor, preço, quilometragem e status.
- [x] **Gestão de Marcas e Modelos**: Cadastro independente de fabricantes e modelos com carregamento dinâmico e encadeado no formulário.
- [x] **Filtro de Busca Avançado**: Consulta por Marca, Modelo, Ano, Faixa de Preço (Mínimo/Máximo) e Status de Disponibilidade.
- [x] **Regra de Negócio de Remoção**: Proteção contra exclusão indevida. Veículos com status `DISPONIVEL` ou `RESERVADO` são bloqueados contra remoção tanto na interface quanto na API; a exclusão só é permitida para veículos `VENDIDO` ou `DESCONTINUADO`.
- [x] **Interface Multi-páginas**: Páginas dedicadas para o Painel Principal (`index.html`), Cadastro (`novo-veiculo.html`), Edição (`editar-veiculo.html`) e Gestão de Marcas (`marcas-modelos.html`).
- [x] **População Automática do Banco**: Ficheiro `data.sql` pré-configurado com 5 marcas populares no Brasil, 10 modelos e 25 veículos de teste.

---

## Endpoints da API REST

A API disponibiliza os seguintes pontos de acesso principais:

### Veículos (`/api/carros`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/carros` | Lista todos os veículos ou aplica filtros via Query Params |
| `GET` | `/api/carros/{id}` | Busca os detalhes de um veículo específico pelo ID |
| `POST` | `/api/carros` | Cadastra um novo veículo no estoque |
| `PUT` | `/api/carros/{id}` | Atualiza as informações de um veículo |
| `DELETE` | `/api/carros/{id}` | Remove um veículo (Requer status VENDIDO ou DESCONTINUADO) |

### Marcas & Modelos (`/api/marcas` e `/api/modelos`)
* `GET /api/marcas` e `POST /api/marcas` - Listagem e cadastro de fabricantes.
* `GET /api/modelos` e `POST /api/modelos` - Listagem e cadastro de modelos associados às marcas.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* **Java Development Kit (JDK 25)** instalado.
* **MySQL Server** em execução na porta `3306`.
* **IntelliJ IDEA** (ou sua IDE de preferência).

### Passo a Passo

**Clonar o Repositório**
   ```bash
   git clone [suspicious link removed]
   cd NOME-DO-REPOSITORIO
Configurar o Banco de Dados MySQL Certifique-se de ajustar as credenciais no ficheiro src/main/resources/application.properties se a sua senha do MySQL for diferente:

spring.datasource.url=jdbc:mysql://localhost:3306/db_estoque_veiculos?createDatabaseIfNotExist=true&serverTimezone=UTC&useSSL=false

spring.datasource.username=root

spring.datasource.password=sua_senha

Executar a Aplicação

Abra o projeto no IntelliJ IDEA.

Execute a classe principal com.gestaoestoque.veiculos.VeiculosApplication.

Acessar o Sistema

Interface Web (Frontend): Abra o navegador em http://localhost:8080/

Documentação Swagger UI: http://localhost:8080/swagger-ui.html
