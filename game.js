const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let score = 0;
let gameOver = false;

// Player
const player = {
    x: 100,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    jumping: false,
    jumpPower: 10,
    gravity: 0.5,
    velocityY: 0
};

// Coins aur Obstacles
let coins = [];
let obstacles = [];
let frameCount = 0;

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    if (e.key === 'ArrowUp' && !player.jumping) {
        player.velocityY = -player.jumpPower;
        player.jumping = true;
    }
});

// Coin banane ka function
function spawnCoin() {
    coins.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 100) + 50,
        width: 15,
        height: 15,
        speed: 3
    });
}

// Obstacle banane ka function
function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        y: canvas.height - 30,
        width: 30,
        height: 30,
        speed: 3
    });
}

// Collision check
function checkCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Game loop
function update() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over! Score: ' + score, canvas.width / 2 - 150, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player draw
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Player physics
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Coins
    if (frameCount % 100 === 0) {
        spawnCoin();
    }

    coins.forEach((coin, index) => {
        coin.x -= coin.speed;
        ctx.fillStyle = 'gold';
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);

        if (checkCollision(player, coin)) {
            score += 10;
            scoreDisplay.textContent = score;
            coins.splice(index, 1);
        }

        if (coin.x < -coin.width) {
            coins.splice(index, 1);
        }
    });

    // Obstacles
    if (frameCount % 150 === 0) {
        spawnObstacle();
    }

    obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacle.speed;
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (checkCollision(player, obstacle)) {
            gameOver = true;
        }

        if (obstacle.x < -obstacle.width) {
            obstacles.splice(index, 1);
        }
    });

    frameCount++;
    requestAnimationFrame(update);
}

// Game shuru
update();
