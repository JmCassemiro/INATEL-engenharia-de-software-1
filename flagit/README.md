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

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

