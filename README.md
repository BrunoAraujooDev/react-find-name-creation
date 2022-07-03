# Projeto do teste MUNDO LIVRE DIGITAL :computer:

Projeto criado para o processo seletivo da empresa Mundo Livre Digital.

Essa aplicação foi criada em React, no intuito de demonstrar minhas habilidades de front-end e lógica de programação com Javascript.

O intuito dela é que o usuário consiga descobrir qual a origem do nome pesquisado. Bastando que ele digite o nome no campo correspondente e a informação de origem do nome será apresentada.

Para demonstrar a origem dos nomes, a aplicação consome a API **nationalize**, um arquivo json com todos os códigos dos países disponíveis e a API **contryflag** para adquirir a bandeira dos países correspondentes.

Foi utilizado para fazer as requisições o Axios.

## App

![App Screenshot](./.github/app_screenshot.png)

## Setup

Para instalação de todos os pacotes:

```Javascript
npm i
```

Inicialização da aplicação:

```Javascript
npm start
```

## Explicando o código

Foi utilizado uma arquitetura de projeto pensando na melhor organização de arquivos e código, segue abaixo as explicações:

- Pasta View: Se encontra todas as telas da aplicação, como essa aplicação só tem uma tela, nela está localizada a pasta home;

- Pasta components: Se encontra todos os componentes da aplicação que são chamados pela view;

- Pasta config: Tem a configuração do axios, que foi utilizado para realizar as requisições HTTP;

- Pasta utils: Nela se encontra os códigos que podem ser chamados por qualquer componente, como validações e requisição no json;

- Pasta services: Possui todas as requisições http feitas através do axios para a API.

- Arquivo db.json: Um JSON com as informações dos países, como nome e código do mesmo.
