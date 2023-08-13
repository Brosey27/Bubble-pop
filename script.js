const gameContainer = document.querySelector('.game-container');
let score = 0;

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  // Set random position within the game container
  const x = Math.random() * (gameContainer.clientWidth - 50);
  const y = Math.random() * (gameContainer.clientHeight - 50);
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  
  // Add event listener to handle bubble click
  bubble.addEventListener('click', () => {
    popBubble(bubble);
  });
  
  gameContainer.appendChild(bubble);
}

function popBubble(bubble) {
  bubble.removeEventListener('click', () => {
    popBubble(bubble);
  });
  bubble.style.backgroundColor = '#ff6347'; // Change color when popped
  bubble.style.transform = 'scale(0.5)'; // Shrink the bubble
  score++;
  updateScore();
  setTimeout(() => {
    gameContainer.removeChild(bubble);
  }, 300); // Remove the bubble after a short delay
}

function updateScore() {
  const scoreDisplay = document.querySelector('.score');
  scoreDisplay.textContent = `Score: ${score}`;
}

setInterval(createBubble, 1000); // Create a new bubble every second
