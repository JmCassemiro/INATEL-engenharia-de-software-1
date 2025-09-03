from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from flag_api import get_random_flag, get_countries_name

import os
from fastapi.templating import Jinja2Templates

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    country = await get_random_flag()

    # renderiza o template com a bandeira
    response = templates.TemplateResponse(
        request,
        "index.html",
        {"flag_url": country["flag"]},
    )

    # seta o cookie com o país correto
    response.set_cookie(key="correct_country", value=country["name"])

    return response


@router.post("/guess")
async def guess(request: Request):
    data = await request.json()
    correct_flag = request.cookies.get("correct_country")

    # verifica se o palpite está correto
    is_guess_correct = True
    if data["answer"].lower() == correct_flag.lower():
        message = "Parabéns! Você acertou!"
        is_guess_correct = False
    else:
        correct_flag = correct_flag

    # retorna se o palpite está correto junto com o país correto
    return {"correct_flag": correct_flag, "is_guess_correct": is_guess_correct}


@router.get("/get_names")
async def get_names():
    countries = await get_countries_name()
    return countries