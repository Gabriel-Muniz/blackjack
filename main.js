const valorCartas = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const naipeCartas = ["♦️", "♠️", "♥️", "♣️"];

const deckCartas = [];

function Carta(valor, naipe) {
  this.valor = valor;
  this.naipe = naipe;
}

function criarCartas() {
  valorCartas.map((valor) => {
    naipeCartas.forEach((naipe) => {
      const novaCarta = new Carta(valor, naipe);
      deckCartas.push(novaCarta);
    })
  })
}

criarCartas();
console.log(deckCartas);