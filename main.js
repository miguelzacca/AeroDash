//Miguel
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const centerX_canvas = canvas.width * .5;
const centerY_canvas = canvas.height * .5;

const backgroundImage = new Image();
backgroundImage.src = "./assets/background.webp";

const cloudImage = new Image();
cloudImage.src = './assets/cloud.webp';

const explosion = new Image();
explosion.src = "./assets/explosion.png";

const planeImage = new Image();
planeImage.src = localStorage.getItem("plane") || "./assets/ap-1.webp";

const planeLevel = planeImage.src.split("-")[1].split(".")[0];
const speed = 10 * (1 + planeLevel * .25);

const collision_sound = new Audio('./assets/collision.wav');
collision_sound.volume = 1;

const point_sound = new Audio('./assets/point.ogg');
point_sound.volume = 0.1;

const gain = 500;
let points = 0;
let money = Number(localStorage.getItem("money") || 0);

const updatePoints = () => {
  document.querySelector("header").innerHTML = `
    <span>${points.toString().padStart(5, '0')}</span>
    <img src="./assets/screen.webp" />
  `;

  point_sound.play();
}
//Guilherme
updatePoints();

const background = new Background(speed);
const enemies = new Enemies(speed);
const planeObj = new Plane(speed);
const collisions = new Collisions(planeObj.plane, enemies.enemies, enemies.clouds);

const updateMoney = () => {
  for (const enemy of enemies.enemies) {
    if (enemy.x < 0 + 150 && enemy.x > 0 + 150 - speed) {
      points += gain;
      money += gain;
      localStorage.setItem("money", money);
      updatePoints();

      document.querySelector("header span").style.opacity = 0;
      setTimeout(() => {
        document.querySelector("header span").removeAttribute("style");
      }, 250);
    }
  }
}

//Sara
const lost = () => {
  const plane = planeObj.plane;
  ctx.drawImage(explosion, plane.x + plane.width * .5, plane.y - plane.height * .5, 100, 100);
  document.querySelector('.lost').style.display = 'flex';
  collision_sound.play();
}

//Miguel

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  planeObj.updatePosition();
  planeObj.draw();
  enemies.update();
  updateMoney();

  if (collisions.update()) {
    return lost();
  }

  requestAnimationFrame(gameLoop);
};

window.addEventListener("mousemove", (event) => {
  let mousePos = event.clientY;

  if (mousePos > canvas.height - 75) {
    mousePos = canvas.height - 75;
  } else if (mousePos <= 25) {
    mousePos = 25;
  }
  planeObj.move(mousePos);
});

gameLoop();