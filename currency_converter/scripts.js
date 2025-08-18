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
    
    <div class="conversion-result">
      <h2>Resultado da Conversão</h2>
      <p class="main-value">
        <strong>${value.value} ${pairData.code}</strong> = 
        <strong class="converted">${(pairData.ask * value.value).toFixed(2)} ${pairData.codein}</strong>
      </p>
      <p>
        <span class="rate-label">Taxa de câmbio:</span> <strong>${pairData.ask}</strong>
      </p>
      <p class="update-info">
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