import random
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from flag_api import get_random_flag

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    flag_data = await get_random_flag()

    random_number = random.randint(0, len(flag_data) - 1)
    flag = flag_data[random_number]["flags"]["png"]
    name = flag_data[random_number]["name"]["common"]

    response = templates.TemplateResponse(
        "index.html",
        {"request": request, "flag_url": flag},
    )

    response.set_cookie(key="correct_country", value=name)

    return response


@router.post("/guess")
async def guess(request: Request):
    data = await request.json()
    correct_flag = request.cookies.get("correct_country")
    is_correct = False

    if data["answer"].lower() == correct_flag.lower():
        message = "Parabéns! Você acertou!"
        is_correct = True
    else:
        message = f"Errado! A resposta correta era {correct_flag}."

    return {"message": message, "correct": is_correct}
