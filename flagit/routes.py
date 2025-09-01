from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from flag_api import get_random_flag, get_countries_name

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    country = await get_random_flag()

    response = templates.TemplateResponse(
        "index.html",
        {"request": request, "flag_url": country["flag"]},
    )

    response.set_cookie(key="correct_country", value=country["name"])

    return response


@router.post("/guess")
async def guess(request: Request):
    data = await request.json()
    correct_flag = request.cookies.get("correct_country")

    is_guess_correct = False
    if data["answer"].lower() == correct_flag.lower():
        message = "Parabéns! Você acertou!"
        is_guess_correct = True
    else:
        correct_flag = correct_flag

    return {"correct_flag": correct_flag, "is_guess_correct": is_guess_correct}


@router.get("/get_names")
async def get_names():
    countries = await get_countries_name()
    return countries