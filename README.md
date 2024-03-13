# Web Project API Full

Este projeto consiste em uma aplicação completa com backend em Node.js e frontend em React. O backend fornece uma API RESTful para interagir com um banco de dados MongoDB. O frontend é uma aplicação React que consome esta API.

### Veja como ficou meu projeto clicando [aqui](https://www.maikoncorreaaround.mooo.com){:target="_blank"}.



## Screenshots

Aqui estão alguns screenshots do meu projeto:

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/3a6fbf2a-079f-4a71-87db-994acb469f42" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/58eb39aa-3aaa-45f0-8a3b-a2b7f81f4f86" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/983fc857-8454-4c2a-8d58-7fc06bba3b4a" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/db8239ac-8d02-480d-b2c3-899966816432" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/db49a2bf-33b2-4c2c-95e1-e36dd7b07131" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/826c6f05-1ec4-4c29-8c84-835714d8084b" width="150" height="150">

<img src="https://github.com/MaikonCorrea/web_project_api_full/assets/121962633/84150343-136a-4725-abc9-6931ba9a4cf8" width="150" height="150">








## Configuração do Ambiente

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- MongoDB instalado
- Conta no Google Cloud Platform (para configuração da VM) ou outra de sua preferência.

### Configuração da VM no Google Cloud

1. Crie uma VM no Google Cloud Platform.
2. Instale as dependências necessárias (Node.js, MongoDB).
3. Configure as portas para permitir tráfego HTTP (porta 80) e HTTPS (porta 443).
4. Faça o deploy do backend e do frontend na VM.

## Backend

### Instalação

```bash
npm install
### Execução em Ambiente de Desenvolvimento

npm run dev
### Execução em Ambiente de Produção

npm start

````

### Dependências
- Express.js: Framework web para Node.js
- Mongoose: ODM (Object Data Modeling) para MongoDB
- Joi: Validação de dados
- JSON Web Token: Implementação de autenticação via tokens JWT
- Outras dependências estão listadas no arquivo package.json

## Frontend

### Instalação

```bash
npm install

npm start

npm run build
````


### Dependências

- React: Biblioteca para construção de interfaces de usuário
- React Router DOM: Gerenciamento de rotas para aplicativos React
- Jest e React Testing Library: Ferramentas de teste
- Outras dependências estão listadas no arquivo `package.json`

## Deploy

O deploy do frontend pode ser realizado utilizando o script `deploy` definido no arquivo `package.json`. Certifique-se de substituir `<user>` e `<host>` pelo seu usuário e endereço IP da VM.

```bash
npm run deploy
````


Entendi, aqui está o README com a seção "Licença" movida para baixo das Dependências em Markdown:

markdown
Copy code
### Dependências

- React: Biblioteca para construção de interfaces de usuário
- React Router DOM: Gerenciamento de rotas para aplicativos React
- Jest e React Testing Library: Ferramentas de teste
- Outras dependências estão listadas no arquivo `package.json`

## Deploy

O deploy do frontend pode ser realizado utilizando o script `deploy` definido no arquivo `package.json`. Certifique-se de substituir `<user>` e `<host>` pelo seu usuário e endereço IP da VM.

```bash
npm run deploy

```

Este README fornece uma visão geral do projeto, incluindo instruções de configuração, execução e deploy. Certifique-se de adaptar as instruções conforme necessário para o seu ambiente específico.
