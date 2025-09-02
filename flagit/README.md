# FlagIt — Adivinhe a Bandeira

## Descrição
FlagIt é um jogo web simples onde você deve adivinhar o país correspondente à bandeira exibida. O jogo fornece feedback imediato e permite avançar para uma nova bandeira após cada resposta.

## Funcionalidades
- Exibe bandeiras aleatórias de países.
- Feedback imediato sobre a resposta do usuário.
- Contador de streak de acertos.
- Interface simples e responsiva usando HTML, CSS e JavaScript.
- Backend em FastAPI com rotas para servir páginas e validar respostas.

## Pré-requisitos
- Python 3.7 ou superior.
- pip instalado.
- Git (opcional, para clonar o repositório).

## Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/thmsVDC/INATEL-engenharia-de-software.git
   cd flagit
   ```
2. Crie um ambiente virtual (recomendado):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

## Executando o projeto
1. Ative o ambiente virtual.
2. Inicie o servidor FastAPI:
   ```bash
   uvicorn main:app --reload
   ```
3. Abra o navegador e acesse:
   ```
   http://127.0.0.1:8000
   ```

## Uso
- A página inicial exibirá uma bandeira.
- Digite o nome do país correspondente e clique em "Enviar".
- Receba feedback imediato sobre sua resposta.
- Se correto, a página recarregará com uma nova bandeira.

## Testes
Para rodar os testes do projeto, utilize o framework `pytest`. Os testes utilizam o `TestClient` do FastAPI para simular requisições HTTP à aplicação, permitindo validar as rotas e respostas do servidor. Além disso, funções assíncronas são mockadas para garantir que os testes sejam determinísticos e independentes de fatores externos.

### Passos para rodar os testes:
1. Certifique-se de que o ambiente virtual está ativado.
2. Instale as dependências de teste (se houver um arquivo `requirements-test.txt` ou similar):
   ```bash
   pip install -r requirements-test.txt
   ```
3. Execute os testes com:
   ```bash
   pytest
   ```

### Observações:
- O uso do `TestClient` permite testar rotas FastAPI sem a necessidade de rodar o servidor manualmente.
- Para funções assíncronas, utilize mocks com bibliotecas como `unittest.mock` para simular o comportamento esperado e controlar os retornos durante os testes.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.
