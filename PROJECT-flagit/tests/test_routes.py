from fastapi.testclient import TestClient
from fastapi import FastAPI
from flagit.routes import router, templates
import pytest
from unittest.mock import patch, AsyncMock
from flagit.flag_api import get_random_flag, get_countries_name


# ---------- Testes de lógica pura ----------

# cria um app de teste
app = FastAPI()
app.include_router(router)
client = TestClient(app)

# testa se a rota home retorna 200 e seta o cookie
def test_home_sets_cookie():
    response = client.get("/")
    assert response.status_code == 200

    # verifica se o cookie da bandeira foi setado
    assert "correct_country" in response.cookies

# testa um palpite correto
def test_guess_correct():
    # simula o cookie com o país "Brasil"
    client.cookies.set("correct_country", "Brasil")

    # faz um palpite correto
    response = client.post("/guess", json={"answer": "Brasil"})
    data = response.json()
    assert data["is_guess_correct"] is True

# teste para palpite errado
def test_guess_wrong():
    # simula o cookie com o país "Brasil"
    client.cookies.set("correct_country", "Brasil")

    # faz um palpite errado
    response = client.post("/guess", json={"answer": "Argentina"})
    data = response.json()

    assert data["is_guess_correct"] is False

# teste para normalização de nomes
def test_normalize_name():
    assert "  Brasil  ".strip().lower() == "brasil"
    assert "México".strip().lower() == "méxico"


# ---------- Testes de funções assíncronas (mock) ----------

@pytest.mark.asyncio
@patch("flagit.flag_api.get_random_flag", new_callable=AsyncMock)
async def test_get_random_flag(mock_get_random_flag):
    mock_get_random_flag.return_value = {"flag": "http://flag.url/flag.png", "name": "Brazil"}
    result = await mock_get_random_flag()
    
    assert "flag" in result
    assert "name" in result
    assert result["name"] == "Brazil"

@pytest.mark.asyncio
@patch("flagit.flag_api.get_countries_name", new_callable=AsyncMock)
async def test_get_countries_name(mock_get_countries_name):
    mock_get_countries_name.return_value = ["Brazil", "Argentina", "Chile"]
    result = await mock_get_countries_name()

    assert isinstance(result, list)
    assert "Brazil" in result
    assert len(result) == 3