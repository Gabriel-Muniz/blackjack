const valorCartas = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const naipeCartas = ["♦️", "♠️", "♥️", "♣️"];

const deckCartas = [];
const cartasIndisponiveis = [];

function Carta(valor, naipe) {
  this.valor = valor;
  this.naipe = naipe;
}

const criarCartas = (function () {
  valorCartas.map((valor) => {
    naipeCartas.forEach((naipe) => {
      const novaCarta = new Carta(valor, naipe);
      deckCartas.push(novaCarta);
    });
  });
})();

function obterCartaAleatoria() {
  let aux;
  do {
    aux = Math.floor(Math.random() * 52);
  } while (!checarCartaValida(deckCartas[aux]));
  
  cartasIndisponiveis.push(deckCartas[aux]);
  return aux;
}

function checarCartaValida(carta) {
  const cartaSorteada = cartasIndisponiveis.find(
    (cartaIndisponivel) => cartaIndisponivel === carta
  );

  if (cartaSorteada) {
    return false;
  }
  return true;
}