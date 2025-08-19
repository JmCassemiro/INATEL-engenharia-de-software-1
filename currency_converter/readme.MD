# 💱 Conversor de Moedas

Um projeto simples e funcional para conversão de moedas em tempo real utilizando a API [AwesomeAPI](https://docs.awesomeapi.com.br/).  
Construído com **HTML, CSS e JavaScript**, e configurado para rodar em um ambiente **Node.js**, utilizando o framework **Express** para servir os arquivos estáticos da aplicação.

---

## 🚀 Funcionalidades
- Converter valores entre as principais moedas: **USD, EUR, BRL, JPY e GBP**.
- Interface simples e responsiva.
- Integração com a biblioteca **Axios** para requisições HTTP, carregada via CDN no navegador.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Node.js**
- **Axios** (via CDN no front-end)
- **Express** (para servir a aplicação localmente)

---

## 📂 Estrutura do Projeto
```bash
currency_converter/
│── index.html         # Estrutura da aplicação
│── styles.css         # Estilos
│── scripts.js         # Lógica de conversão
│── server.js          # Servidor Node.js com Express
│── package.json       # Configurações do projeto Node
```

---

## ⚙️ Configuração e Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/currency_converter.git
cd currency_converter
```

### 2. Instale as dependências
```bash
npm install express
```

---

# Executando o projeto

### Rodar o servidor localmente
```bash
node server.js
```

### O servidor será iniciado em:
```bash
http://localhost:3000
```