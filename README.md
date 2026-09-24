# 🛒 Cadastro de Produtos

Um projeto pessoal desenvolvido para colocar em prática meus conhecimentos em **desenvolvimento Full Stack**, com um foco especial no **Back-end com Java e Spring Boot**.

A ideia surgiu como um desafio pessoal: construir uma aplicação simples de cadastro de produtos, mas que tivesse algumas das características encontradas em sistemas reais, como **autenticação, controle de permissões, CRUD, validações e integração com banco de dados**.

Foi também uma forma de sair um pouco da teoria e entender, na prática, como diferentes tecnologias se conectam para formar uma aplicação completa.

## ✨ Sobre o projeto

O sistema permite que usuários se cadastrem e façam login para acessar a aplicação. A partir daí, o acesso às funcionalidades é definido de acordo com a **role** de cada usuário.

### 👤 Usuário (`USER`)

Usuários comuns podem:

* Visualizar os produtos cadastrados;
* Consultar a lista de produtos disponíveis;

### 🛡️ Administrador (`ADMIN`)

Administradores possuem acesso completo ao gerenciamento dos produtos, podendo:

* Cadastrar novos produtos;
* Visualizar produtos;
* Editar produtos existentes;
* Excluir produtos.

Por questões de segurança, a criação de usuários `ADMIN` não é disponibilizada no cadastro público da aplicação.

## ⚙️ Back-end

O Back-end foi a principal parte do projeto e onde concentrei meus estudos e esforços.

A aplicação foi desenvolvida utilizando **Java + Spring Boot**, com uma API REST responsável por toda a comunicação e pelas regras de negócio.

Também utilizei **Spring Security** para implementar a autenticação e o controle de acesso baseado em roles, garantindo que cada usuário tenha acesso somente às funcionalidades permitidas para seu nível de acesso.

O projeto também conta com **validações**, tratamento das requisições e integração com um banco de dados **MySQL**, onde são armazenados tanto os usuários quanto os produtos cadastrados.

## 🎨 Front-end

O Front-end foi desenvolvido com **HTML, CSS e JavaScript**, com IA durante o processo de desenvolvimento.

Busquei manter uma interface **simples, agradável e intuitiva**, sem exagerar nos elementos visuais. A ideia foi criar algo fácil de entender e que deixasse as funcionalidades do sistema em destaque.

A sessão do usuário também é controlada no Front-end através do `localStorage`, permitindo manter o estado de autenticação durante a navegação.

## 🧰 Tecnologias utilizadas

**Back-end**

* ☕ Java
* 🌱 Spring Boot
* 🔐 Spring Security
* 🔗 API REST
* 🗄️ MySQL

**Front-end**

* 🌐 HTML5
* 🎨 CSS3
* ⚡ JavaScript

## 🎥 Demonstração

Atualmente, o backend do projeto **não está hospedado**, então não é possível testar todas as funcionalidades diretamente pelo navegador.

⚡Link para demonstração do front: **https://gustavoloiola.github.io/projeto-cadastro/**

Para solucionar isso, preparei um **vídeo demonstrativo** mostrando a aplicação funcionando na prática, incluindo:

* Cadastro e login de usuários;
* Diferentes permissões entre `USER` e `ADMIN`;
* Cadastro de produtos;
* Edição de produtos;
* Listagem;
* Exclusão;
* Comunicação entre Front-end, Back-end e banco de dados.

> 🎬 **Confira o vídeo de demonstração no projeto/portfólio.**

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido principalmente para **aprender fazendo**.

Meu objetivo foi consolidar meus conhecimentos em **Java, Spring Boot, Spring Security, APIs REST e MySQL**, além de entender melhor como estruturar uma aplicação Full Stack e implementar recursos que fazem parte de sistemas reais.

Ainda há bastante espaço para evoluir e adicionar novas funcionalidades, mas esse projeto representa uma etapa importante na minha jornada de aprendizado e no meu desenvolvimento como profissional de tecnologia.

---

### 📚 Projeto pessoal e educacional

Este projeto foi desenvolvido exclusivamente para **fins de estudo e aprendizado**, sem finalidade comercial.

**Feito para aprender, testar, errar, corrigir e evoluir. 🚀**
