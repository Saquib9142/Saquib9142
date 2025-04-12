const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 500, width: 40, height: 40, color: "lime" };
let obstacles = [];
let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function createObstacle() {
  const x = Math.floor(Math.random() * 360);
  obstacles.push({ x: x, y: -40, width: 40, height: 40, color: "red" });
}

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function update() {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player Movement
  if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
  if (keys["ArrowRight"] && player.x < 360) player.x += 5;

  drawRect(player);

  // Obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    obs.y += 5;
    drawRect(obs);

    // Collision
    if (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }

  // Remove old obstacles
  obstacles = obstacles.filter(obs => obs.y < 600);
}

setInterval(() => {
  createObstacle();
}, 1000);

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
