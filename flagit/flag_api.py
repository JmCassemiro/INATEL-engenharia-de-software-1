import httpx

async def get_random_flag():
    url = "https://restcountries.com/v3.1/all?fields=name,flags"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        countries = res.json()
    return countries