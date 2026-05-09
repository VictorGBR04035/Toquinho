const pergunta = document.getElementById("pergunta");
const opcoes = document.querySelector(".opcoes");
const feedback = document.getElementById("feedback");
const botaoProximo = document.getElementById("proximo");
const barra = document.getElementById("barra");
const personagem = document.getElementById("personagem") || {};

let pontuacao = 0;
let respondeu = false;
let faseAtual = 0;
let nivelAtual = 0;

// 🧠 NÍVEIS DO JOGO
const niveis = [
    {
        nome: "Frutas",
        fases: [
            {
                pergunta: "Clique na maçã",
                respostas: [
                    { img: "/assets/images/maca.png", correta: true },
                    { img: "/assets/images/pera.png", correta: false },
                    { img: "/assets/images/uva.png", correta: false }
                ]
            },
            {
                pergunta: "Clique na uva",
                respostas: [
                    { img: "/assets/images/uva.png", correta: true },
                    { img: "/assets/images/maca.png", correta: false },
                    { img: "/assets/images/pera.png", correta: false }
                ]
            }
        ]
    },
    {
        nome: "Cores",
        fases: [
            {
                pergunta: "Clique na fruta vermelha",
                respostas: [
                    { img: "/assets/images/maca.png", correta: true },
                    { img: "/assets/images/pera.png", correta: false },
                    { img: "/assets/images/uva.png", correta: false }
                ]
            },
            {
                pergunta: "Clique na fruta verde",
                respostas: [
                    { img: "/assets/images/pera.png", correta: true },
                    { img: "/assets/images/uva.png", correta: false },
                    { img: "/assets/images/maca.png", correta: false }
                ]
            }
        ]
    }
];

// 🔀 embaralhar
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 📊 barra de progresso (agora correta)
function atualizarBarra() {
    const totalFases = niveis[nivelAtual].fases.length;
    barra.style.width = ((faseAtual + 1) / totalFases) * 100 + "%";
}

// 🎮 carregar fase
function carregarFase() {
    respondeu = false;
    feedback.textContent = "";
    opcoes.innerHTML = "";

    atualizarBarra();

    const fase = niveis[nivelAtual].fases[faseAtual];
    pergunta.textContent = fase.pergunta;

    const respostasEmbaralhadas = embaralhar([...fase.respostas]);

    respostasEmbaralhadas.forEach(resposta => {
        const img = document.createElement("img");
        img.src = resposta.img;
        img.classList.add("fruta");

        img.addEventListener("click", () => {
            if (respondeu) return;

            respondeu = true;

            // limpa animação antes
            personagem.classList.remove("acerto", "erro");

            if (resposta.correta) {
                feedback.textContent = "✅ Muito bem!";
                feedback.style.color = "green";
                img.style.border = "4px solid green";
                pontuacao++;

                personagem.classList.add("acerto");

            } else {
                feedback.textContent = "❌ Tente novamente!";
                feedback.style.color = "red";
                img.style.border = "4px solid red";

                personagem.classList.add("erro");

                // 🔥 mostrar resposta correta
                setTimeout(() => {
                    document.querySelectorAll(".fruta").forEach((el, index) => {
                        if (respostasEmbaralhadas[index].correta) {
                            el.style.border = "4px solid green";
                        }
                    });
                }, 300);
            }

            // remove animação depois
            setTimeout(() => {
                personagem.classList.remove("acerto", "erro");
            }, 300);
        });

        opcoes.appendChild(img);
    });
}

// ▶️ próximo
botaoProximo.addEventListener("click", () => {
    faseAtual++;

    if (faseAtual >= niveis[nivelAtual].fases.length) {
        faseAtual = 0;
        nivelAtual++;

        if (nivelAtual >= niveis.length) {
            alert("Fim do jogo! Pontuação: " + pontuacao);
            nivelAtual = 0;
            pontuacao = 0;
        } else {
            alert("Novo nível desbloqueado!");
        }
    }

    carregarFase();
});

// 🌙 modo calmo melhorado
document.getElementById("modoCalmo").addEventListener("click", () => {
    document.body.style.background = "#f4f4f4";
    document.body.style.transition = "0.3s";
});

// 🎭 troca de skin manual (caso use botão depois)
function trocarSkin(nome) {
    personagem.src = "/assets/images/" + nome;
}

// 🚀 iniciar jogo
carregarFase();

// 🔥 troca automática para personagem2 no final
personagem.src = "/assets/images/personagem2.png";