import httpx
import random


async def get_random_flag():
    url = "https://restcountries.com/v3.1/all?fields=name,flags"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        countries = res.json()
    
    random_number = random.randint(0, len(countries) - 1)
    flag = countries[random_number]["flags"]["png"]
    name = countries[random_number]["name"]["common"]
    
    return {
        "flag": flag,
        "name": name
    }

async def get_countries_name():
    url = "https://restcountries.com/v3.1/all?fields=name"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        results = res.json()

    names = []
    for result in results:
        names.append(result["name"]["common"])
        
    return sorted(names)
    