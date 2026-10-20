import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const joken = ["pedra", "papel", "tesoura"];
let escolhaJogador = null;
let escolhaCPU = null;


app.post("/jogada", (req, res) => {

    try {

    escolhaJogador = req.body?.jogada;

    if (joken[escolhaJogador] === undefined) {
        return res.status(400).json({
            mensagem: "Jogada inválida!"
        });
    }

    res.status(200).json({
        mensagem: `Jogador escolheu ${joken[escolhaJogador]}!`,
    });

    } catch(erro) {
        res.status(500).json({
            mensagem: "Erro interno do servidor!"
        });
    }


});

app.post("/start", (req, res) => {

    escolhaCPU = Math.floor(Math.random() * 3);



    if (escolhaJogador === null) {
        return res.status(400).json({
            vencedor: "Escolha uma jogada primeiro!"
        });
    }

    try {

        if (joken[escolhaJogador] === joken[0] && joken[escolhaCPU] === joken[2]) {
        res.status(200).json({
            jogador: joken[escolhaJogador],
            CPU: joken[escolhaCPU],
            vencedor: "Jogador vencel!",
            victoryJogador: 1,
            victoryCPU: 0
        });
    } else if (joken[escolhaJogador] === joken[1] && joken[escolhaCPU] === joken[0]) {
        res.status(200).json({
            jogador: joken[escolhaJogador],
            CPU: joken[escolhaCPU],
            vencedor: "Jogador vencel!",
            victoryJogador: 1,
            victoryCPU: 0
        });
    } else if (joken[escolhaJogador] === joken[2] && joken[escolhaCPU] === joken[1]) {
        res.status(200).json({
            jogador: joken[escolhaJogador],
            CPU: joken[escolhaCPU],
            vencedor: "Jogador vencel!",
            victoryJogador: 1,
            victoryCPU: 0
        });
    } else if (escolhaJogador === escolhaCPU) {
        res.status(200).json({
            jogador: joken[escolhaJogador],
            CPU: joken[escolhaCPU],
            vencedor: "Empate!",
            victoryJogador: 0,
            victoryCPU: 0
        });
    } else {
    res.status(200).json({
            jogador: joken[escolhaJogador],
            CPU: joken[escolhaCPU],
            vencedor: "CPU vencel!",
            victoryJogador: 0,
            victoryCPU: 1
        });
    }
    
    escolhaJogador = null;
    escolhaCPU = null;

    } catch (erro) {
        console.error("Erro no start:", erro.message);

        res.status(500).json({
        mensagem: "Erro interno no servidor!"
    });
    }
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`API funcionando na porta ${porta}!`);
});