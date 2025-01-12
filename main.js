// const valorCartas = ["A", "A", "A", 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const valorCartas = ["A", "A", "A", 4, 5, 6, 7, 8, 9, 10];
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
    aux = Math.floor(Math.random() * deckCartas.length);
  } while (!checarCartaValida(deckCartas[aux]));

  cartasIndisponiveis.push(deckCartas[aux]);

  console.log(deckCartas[aux]);

  return deckCartas[aux];
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

function Player(nome, cartasMao = []) {
  this.nome = nome;
  this.cartasMao = cartasMao;
}

Player.prototype.addCarta = function () {
  this.cartasMao.push(obterCartaAleatoria());
};

Player.prototype.pontos = function () {
  let aux = 0;
  let filtrarAses = this.cartasMao.filter((carta) => carta.valor === "A"); //Cria Array contendo Áses do baralho

  this.cartasMao.forEach((carta) => {
    //Adiciona o valor de cara carta;
    aux +=
      typeof carta.valor !== "number" && carta.valor !== "A" //Se não for número e não for Ás. Adicione 10
        ? 10
        : carta.valor === "A" //Se for Ás, adicione 11
        ? 11
        : carta.valor; // Sendo do tipo número, adicione o valor
  });

  if (this.cartasMao.find((carta) => carta.valor === "A")) {
    // Se o jogador tiver Ás na mão
    for (let i = 0; i < filtrarAses.length; i++) {
      if (aux > 21) {
        aux -= 10; //Retire 10 pontos sempre que o valor da mão for ultrapassar 21. Tornando o valor do Ás em 1
      }
    }
  }
  return aux;
};

let player = new Player("Gabriel");
let crupie = new Player("Mesa");

const atualizarDisplay = (jogador) => {
  const mostrarPontosJogador = document.querySelector(".display-points");

  mostrarPontosJogador.textContent = jogador.pontos();
}

//        DOM       //
const botaoComprar = document.querySelector(".btn-buyCard");

const ladoJogador = document.querySelector(".player-side");
const cartaContainer = document.querySelector(".cards-container");

botaoComprar.addEventListener("click", () => {
  player.addCarta();

  let ultimaCartaComprada = player.cartasMao[player.cartasMao.length - 1];
  console.log(ultimaCartaComprada.valor);

  const checarNaipe =
    ultimaCartaComprada.naipe === "♣️" || ultimaCartaComprada.naipe === "♠️"
      ? "black-suit"
      : "red-suit";

  const cartaFundo = document.createElement("div");
  cartaFundo.classList.add("card-body");

  const cartaRank = document.createElement("span");
  cartaRank.classList.add("card-rank");

  const cartaRankInvertido = document.createElement("div");
  cartaRankInvertido.classList.add("rank-inverted");

  cartaRankInvertido.textContent =
    cartaRank.textContent = `${ultimaCartaComprada.valor} ${ultimaCartaComprada.naipe}`;

  cartaRank.classList.add(checarNaipe);
  cartaRankInvertido.classList.add(checarNaipe);

  cartaFundo.append(cartaRank, cartaRankInvertido);
  cartaContainer.append(cartaFundo);

  atualizarDisplay(player);
});
