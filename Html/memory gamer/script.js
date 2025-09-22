// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const scoreDisplay = document.getElementById("score");
    const resetBtn = document.getElementById("reset-btn");
  
    const cards = [
      "🖥️", "🖥️", "☁", "☁",
      "🍇", "🍇", "🍓", "🍓", 
        "♥", "♥",  "🛵", "🛵", 
      "🏠", "🏠", "🍉", "🍉"
    ];
  
    let flippedCards = [];
    let matches = 0;
  
    const shuffleCards = () => {
      cards.sort(() => Math.random() - 0.5);
    };
  
    const createCard = (emoji) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">${emoji}</div>
        </div>`;
      card.addEventListener("click", () => handleCardClick(card, emoji));
      return card;
    };
  
    const handleCardClick = (card, emoji) => {
      if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push({ card, emoji });
        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    };
  
    const checkMatch = () => {
      const [first, second] = flippedCards;
      if (first.emoji === second.emoji) {
        matches++;
        scoreDisplay.textContent = matches;
        flippedCards = [];
        if (matches === cards.length / 2) {
          setTimeout(() => alert("You won!"), 500);
        }
      } else {
        setTimeout(() => {
          first.card.classList.remove("flipped");
          second.card.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    };
  
    const initializeGame = () => {
      gameBoard.innerHTML = "";
      scoreDisplay.textContent = 0;
      matches = 0;
      flippedCards = [];
      shuffleCards();
      cards.forEach((emoji) => gameBoard.appendChild(createCard(emoji)));
    };
  
    resetBtn.addEventListener("click", initializeGame);
  
    initializeGame();
  });
  