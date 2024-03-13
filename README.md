# Web Project API Full

Este projeto consiste em uma aplicação completa com backend em Node.js e frontend em React. O backend fornece uma API RESTful para interagir com um banco de dados MongoDB. O frontend é uma aplicação React que consome esta API.

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

```bash
npm run dev
### Execução em Ambiente de Produção

```bash
npm start

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
