import {
    jogadafeita,
    start,
    revanche,
    mostrarPlacar
} from "./logica.js";

const pedra = document.getElementById("botaoPedra");
const papel = document.getElementById("botaoPapel");
const tesoura = document.getElementById("botaoTesoura");
const jogar = document.getElementById("start");
const botaoRevanche = document.getElementById("revanche");

mostrarPlacar();

pedra.addEventListener("click", function() {
    jogadafeita(Number(pedra.value));
});

papel.addEventListener("click", function() {
    jogadafeita(Number(papel.value));
});

tesoura.addEventListener("click", function() {
    jogadafeita(Number(tesoura.value));
});

jogar.addEventListener("click", function() {
    start();
});

botaoRevanche.addEventListener("click", function() {
    revanche();
});