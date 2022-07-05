# Projeto do teste MUNDO LIVRE DIGITAL :computer:

Projeto criado para o processo seletivo da empresa Mundo Livre Digital.

Essa aplicação foi criada em React, no intuito de demonstrar minhas habilidades de front-end e lógica de programação com Javascript.

O intuito dela é que o usuário consiga descobrir qual a origem do nome pesquisado. Bastando que ele digite o nome no campo correspondente e a informação de origem do nome será apresentada.

Para demonstrar a origem dos nomes, a aplicação consome a API **nationalize**, um arquivo json com todos os códigos dos países disponíveis e a API **contryflag** para adquirir a bandeira dos países correspondentes.

Foi utilizado para fazer as requisições o **Axios**.

Todo o site se encontra na língua inglesa.

## Setup

Para instalação de todos os pacotes:

```Javascript
npm i
```

Inicialização da aplicação:

```Javascript
npm start
```

## Explicando a arquitetura :file_folder:

Foi utilizado uma arquitetura de projeto pensando na melhor organização de arquivos e código, segue abaixo as explicações:

- Pasta View: Se encontra todas as telas da aplicação, como essa aplicação só tem uma tela, nela está localizada a pasta home;

- Pasta components: Se encontra todos os componentes da aplicação que são chamados pela view;

- Pasta config: Tem a configuração do axios, que foi utilizado para realizar as requisições HTTP;

- Pasta utils: Nela se encontra os códigos que podem ser chamados por qualquer componente, como validações e requisição no json;

- Pasta services: Possui todas as requisições http feitas através do axios para a API;

- Arquivo db.json: Um JSON com as informações dos países, como nome e código do mesmo.

## Explicando as principais lógicas :keyboard:

- Arquivo: validations.js, linha 1 -> Utilizei o regex pra validar os nomes que são procurados pelo usuário, de modo que, apenas nomes válidos possam ser procurados. Cada nome fora do padrão é armazenado num array e é retornado pela função, onde o componente que a chama renderiza na tela um aviso com os nomes que não são válidos pra busca. Ex: nomes com caracteres especiais ou números;

- - Arquivo: validations.js, linha 26 -> Função para retirar valores duplicados utilizando o new Set() e o filter para tirar possíveis valores nulos;

- Arquivo getCountries.js -> Responsável pela busca no db.json, onde fica o json com os nomes de cada país. Ele recebe como parâmetro o código do país procurado e através de um for ele percorre o array com as informações de todos os países e, assim que ele encontra, ele sai do loop, evitando assim, iterações desnecessárias. Coloquei em arquivo separado a lógica de busca para facilitar a manutenção do código;

- Arquivo findNames.js -> Aqui encontra-se a lógica onde eu separo os nomes que não foram pesquisados anteriormente, colocando-os como retorno para ser utilizado pelo componente que o chama. Para fazer essa separação, utilizei o método filter do javascript para filtrar o array de nomes que o usuário digitou comparando-o com o array antigo que armazena os valores já procurados na requisição anterior;

- Arquivo search.js, linha 19 -> Função onde faço as validações e separação dos nomes, para depois serem renderizados no componente 'nationality.jsx'. Nela utilizei as funções do validations e do findNames, onde eu pego os valores novos que vem como retorno da função findNames e o resto dos nomes vejo se já consta no estado da variável 'result' que é onde é armazenado o resultado das requisições. Os nomes que não foram devolvidos pela função findNames são separados para fazer a requisição na API para pegar a origem de cada um deles. Feito isso, eu junto os valores novos e os antigos que foram solicitados na pesquisa atual pelo usuário para que, no final seja renderizado apenas os nomes que foram digitados. Para isso, utilizei: laços de repetição (for), estrutura condicional (if) e métodos nativos de array, como indexOf e filter. Em caso de algum erro ao longo da função, uma mensagem de erro é retornada para o usuário na tela.

OBS: Ao longo de todos os componentes e funções utilizei funcionalidades da linguagem JS como: spread operator, if ternário e short-circuit evaluation.
