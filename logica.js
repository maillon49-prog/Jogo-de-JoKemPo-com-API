const resultado = document.getElementById("resultado");
const vitoria = document.querySelector(".vitoria");
const escolhasVisiveis = document.querySelector(".escolhas-visiveis");
const resultadoCss = document.querySelector(".resultado-css");

const placarJogador = document.getElementById("placarJogador");
const placarCPU = document.getElementById("placarCPU");

let vitoriaJogador = 0;
let vitoriaCPU = 0;

const imgJogador = document.getElementById("imgJogador");
const vencedor = document.getElementById("vencedor");
const imgCPU = document.getElementById("imgCPU");

let escolha;
let podeComecar = false;

const iconesJoken = {
    pedra: "img/pedra.png",
    papel: "img/papel.png",
    tesoura: "img/tesoura.png"
};

export function mostrarPlacar() {
    placarJogador.innerHTML = vitoriaJogador;
    placarCPU.innerHTML = vitoriaCPU;
}

export async function jogadafeita(jogadaEscolhida) {
    escolha = jogadaEscolhida;

    try {
        const resposta = await fetch(
            "http://localhost:3000/jogada", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jogada: escolha
                    })
            });

            if (!resposta.ok) {
                throw new Error(`Erro da API: ${resposta.status}`);
            }

            const dados = await resposta.json();
            resultado.innerHTML = dados.mensagem;
            podeComecar = true;

    } catch(erro) {
        console.error("Erro encontrado: ", erro);

        if (erro instanceof TypeError) {
            resultado.textContent = "Não foi possível conectar com a API!";
        } else {
            resultado.textContent = erro.mensagem;
        }
    }

}

export async function start() {

        if (podeComecar) {
            try {
                const resposta = await fetch(
                "http://localhost:3000/start", {
                    method: "POST",
                });

                if (!resposta.ok) {
                    throw new Error(`Erro da API: ${resposta.status}`);
                }

                const dados = await resposta.json();

                escolhasVisiveis.style.display = "none";
                resultadoCss.style.display = "none";
                vitoria.style.display = "block";

                placarJogador.innerHTML = vitoriaJogador += dados.victoryJogador;
                placarCPU.innerHTML = vitoriaCPU += dados.victoryCPU;

                imgJogador.src = iconesJoken[dados.jogador];
                vencedor.innerHTML = dados.vencedor;
                imgCPU.src = iconesJoken[dados.CPU]

                podeComecar = false;

        } catch(erro) {
            console.error("Erro encontrado: ", erro);

            if (erro instanceof TypeError) {
                resultado. textContent = "Não foi possivel conectar com a API!";
            } else {
                resultado.textContent = erro.mensagem;
            }
        }
    } else {
        resultado.innerHTML = "Escolha um resultado antes de começar!";
    }

}

export function revanche() {
    escolhasVisiveis.style.display = "";
    resultadoCss.style.display = "";
    vitoria.style.display = "none";
    resultado.textContent = "Escolha uma jogada!";
    podeComecar = false;
}


