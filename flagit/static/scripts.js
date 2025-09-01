// Buscando id's no html
const form = document.getElementById('guess-form');
const feedback = document.getElementById('feedback');
const answerInput = document.getElementById('answer');
const current_streak = document.getElementById('current_streak');
const best_streak = document.getElementById('best_streak');

// Buscando dados no cookie do navegador
let current_streak_cookie = get_cookie("current_streak");
let best_streak_cookie = get_cookie("best_streak");

// Função é executada ao carregar a página
addEventListener("DOMContentLoaded", async (event) => {
  // verifica se já possui o cookie com a tentativa atual
  if (current_streak_cookie) {
    current_streak.textContent = `Pontos: ${current_streak_cookie}`

  } else { // é criado caso ainda não tenha no cookie
    document.cookie = "current_streak=0"
    current_streak.textContent = `Pontos: ${current_streak_cookie}`
  }

  // Verifica se já possui a melhor tentativa no cookie
  if (best_streak_cookie) {
    best_streak.textContent = `Melhor tentativa: ${best_streak_cookie}`

  } else { // é criado caso ainda não tenha no cookie
    document.cookie = "best_streak=0"
    best_streak.textContent = `Melhor tentativa: ${best_streak_cookie}`
  }

  // Adicionando sugestões no input
  const countries_datalist = document.getElementById("suggestions");
  try {
    const res = await fetch('/get_names');
    const data = await res.json();
    data.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      countries_datalist.appendChild(option);
    });
  } catch (err) {
    console.error("Erro ao buscar países:", err);
  }


});

// Ao enviar o formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Pega os dados do formulário
  const formData = new FormData(form);
  const answer = { answer: formData.get('answer') };

  // JSON enviado pro FastAPI
  try {
    const res = await fetch('/guess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answer),
    });

    const data = await res.json();
    if (data.is_guess_correct) { // Usuário acertou, incrementa 1 no current_streak
      if (current_streak_cookie !== null && current_streak_cookie !== undefined) { // Se cookie === 0, if entende como false
        current_streak_cookie += 1;
        document.cookie = `current_streak=${current_streak_cookie}`
        current_streak.textContent = `Pontos: ${current_streak_cookie}`;
        swal("Parabéns!", "Você acertou o país.", "success");
        swal({
          title: "Parabéns!",
          text: "Você acertou o país.",
          icon: "success",
        })
          .then(_ => {
            window.location.reload();
          });
      } else { // Caso tenha acertado de primeira e ainda não tenha variável nos cookies
        document.cookie = `current_streak=1`;
        current_streak.textContent = `Pontos: 1`;
      }

      if (current_streak_cookie > best_streak_cookie) {
        best_streak_cookie = current_streak_cookie;
        best_streak.textContent = `Melhor tentativa: ${best_streak_cookie}`;
        document.cookie = `best_streak=${best_streak_cookie}`;
      }

    } else { // Caso usuário tenha errado, streak volta pra zero
      document.cookie = `current_streak=0`;
      current_streak.textContent = `Pontos: 0`;

      swal({
        title: "Errooou!",
        text: "A resposta correta era " + data.correct_flag,
        icon: "error",
      })
        .then(_ => {
          window.location.reload();
        });
    }
  } catch (err) {
    // Qualquer erro de script solta no console do navegador
    console.log(`Error: ${err.message}`)
  }
});

function get_cookie(id) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    if (cookie.includes(id)) {
      const cookieArray = cookie.split("=");
      const value = parseInt(cookieArray[cookieArray.length - 1]);
      return value;
    }
  }
  return null;
}