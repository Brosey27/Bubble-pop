const gameContainer = document.querySelector('.game-container');
let score = 0;
let timeLeft = 30;
let isGameRunning = false;

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
  
    if (Math.random() < 0.3) {
      bubble.classList.add('red-bubble');
    }

  

  
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
    if (bubble.classList.contains('red-bubble')) {
        playRedPopSound(); // Play red bubble pop sound
      gameOver();
    } else {
      bubble.removeEventListener('click', () => {
        popBubble(bubble);
      });
      bubble.classList.add('popped'); // Apply the "popped" class
      score++;
      updateScore();
      setTimeout(() => {
        gameContainer.removeChild(bubble);
      }, 300); // Remove the bubble after a short delay
    }
    const popSound = document.getElementById('popSound');
  popSound.currentTime = 0; // Reset the audio to the beginning
  popSound.play();
  }

  function playRedPopSound() {
    const redPopSound = document.getElementById('redPopSound');
    redPopSound.currentTime = 0; // Reset the audio to the beginning
    redPopSound.play();
  }
  
  function gameOver() {
    isGameRunning = false;
    alert('Game Over! Your final score: ' + score);
    resetGame();
  }

  function updateScore() {
    const scoreDisplay = document.querySelector('.score');
  
    if (score >= 50) {
      scoreDisplay.textContent = `Score: ${score}`;
      scoreDisplay.classList.add('high-score');
      scoreDisplay.classList.remove('medium-score', 'low-score');
    } else if (score >= 20) {
      scoreDisplay.textContent = `Score: ${score}`;
      scoreDisplay.classList.add('medium-score');
      scoreDisplay.classList.remove('high-score', 'low-score');
    } else {
      scoreDisplay.textContent = `Score: ${score}`;
      scoreDisplay.classList.add('low-score');
      scoreDisplay.classList.remove('high-score', 'medium-score');
    }
  }

function resetGame() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
      gameContainer.removeChild(bubble);
    });
    score = 0;
    updateScore();
  }







setInterval(createBubble, 1000); // Create a new bubble every second
