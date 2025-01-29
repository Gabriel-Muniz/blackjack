const suits = ["♦", "♠", "♥", "♣"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

const createDeck = (function () {
  const cardsDeck = [];
  values.forEach((cardValue) => {
    suits.forEach((cardSuit) => {
      cardsDeck.push(cardValue + cardSuit);
    });
  });

  return cardsDeck;
})();

export { createDeck };
