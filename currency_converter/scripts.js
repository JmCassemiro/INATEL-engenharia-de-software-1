const form = document.getElementById("currency-converter-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const value = document.getElementById("amount");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");

  if (fromCurrency === toCurrency) {
    alert("Selecione moedas diferentes para conversão.");
    return;
  }

  const result = await convertValue(fromCurrency.value, toCurrency.value, value.value);
  const pairData = Object.values(result)[0];

  console.log(pairData);

  document.getElementById("result-container").innerHTML = `
    <div style="background: #f9f9f9; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); max-width: 400px; margin: 24px auto;">
      <h2 style="color: #2c3e50; margin-bottom: 16px;">Resultado da Conversão</h2>
      <p style="font-size: 1.2em; margin-bottom: 8px;">
        <strong>${value.value} ${pairData.code}</strong> = 
        <strong style="color: #27ae60;">${(pairData.ask * value.value).toFixed(2)} ${pairData.codein}</strong>
      </p>
      <p style="margin-bottom: 8px;">
        <span style="color: #34495e;">Taxa de câmbio:</span> <strong>${pairData.ask}</strong>
      </p>
      <p style="color: #7f8c8d; font-size: 0.95em;">
        <span>Última atualização:</span> ${new Date(pairData.create_date).toLocaleString("pt-BR")}
      </p>
    </div>
  `;

})

// FUNCTIONS --------------------------------------------------------------------------------------------------------------------------

async function convertValue(fromCurrency, toCurrency, value) {
  try {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}?token=4eab173f982b18df9e08e821df1ef21d179de7eb0bf541c33d46fa36ef91faf2`);
    return response.data;
  } catch (error) {
    alert("Erro ao buscar dados de conversão. Verifique sua conexão com a internet ou tente novamente mais tarde.");
    console.error(error);
  }
}