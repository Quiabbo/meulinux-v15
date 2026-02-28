# Meu Linux - Guia de Deploy Estático (Hostinger/cPanel)

Este projeto foi desenvolvido utilizando **React 18**, **Vite** e **TypeScript**, focado em ser uma **SPA (Single Page Application)** 100% estática e portátil.

## 🚀 Como gerar o build para produção

Para publicar o site na Hostinger ou qualquer hospedagem compartilhada, siga os passos abaixo:

### 1. Requisitos Locais
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação de Dependências
Abra o terminal na pasta do projeto e rode:
```bash
npm install
```

### 3. Gerar o Build
Para gerar os arquivos otimizados para produção:
```bash
npm run build
```
Este comando criará uma pasta chamada `dist/` na raiz do projeto.

## 📂 Como publicar na Hostinger

1. Acesse o **Gerenciador de Arquivos** no painel da Hostinger (hPanel).
2. Navegue até a pasta `public_html`.
3. Faça o upload de **todo o conteúdo** que está dentro da pasta `dist/` do seu computador para a `public_html`.
   - Certifique-se de que o arquivo `.htaccess` também foi enviado (ele é essencial para que as rotas funcionem).

## 🛠️ Configuração de Rotas (SPA Fallback)

Como este site é uma SPA, as rotas são gerenciadas pelo JavaScript. O arquivo `.htaccess` incluído na pasta `public/` (e copiado para `dist/`) garante que, se alguém acessar uma URL diretamente (ex: `meusite.com/sobre`), o servidor redirecione internamente para o `index.html`, permitindo que o React Router assuma o controle.

## 🔑 Variáveis de Ambiente

Se você precisar configurar a chave da API do Gemini para o leitor de áudio em produção:
1. Crie um arquivo `.env.production` na raiz do projeto (antes de rodar o build).
2. Adicione a chave:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```
3. Rode `npm run build` novamente.

---
Desenvolvido com foco em performance e portabilidade.
