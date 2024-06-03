//Miguel
class Background {
  constructor(speed) {
    this.speed = speed;
    this.xPos = 0;
  }

  draw() {
    ctx.drawImage(backgroundImage, this.xPos, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, this.xPos + canvas.width, 0, canvas.width, canvas.height);

    this.xPos -= this.speed;

    if (this.xPos <= -canvas.width) {
      this.xPos = 0;
    }
  }
}

class Enemies {
  constructor(speed) {
    this.speed = speed;
    this.enemies = [];
    this.spawnRate = 5000;
    this.lastSpawn = 0;
    this.objImages = [];
    this.clouds = [];
    this.lastSpawnCloud = 0;
    this.spawnRateCloud = 5000;
  }

  spawnTower() {
    const height = Math.floor(Math.random() * (300 - 200)) + 200;

    const enemy = {
      x: canvas.width + 1000,
      y: canvas.height - height,
      width: 100,
      height: height,
      margin: 20,
    };

    const randImgArray = Array.from({ length: 7 }, (_, i) => `predio-${i + 1}`);
    let rand = Math.floor(Math.random() * randImgArray.length);

    const enemyImage = new Image();
    enemyImage.src = `./assets/${randImgArray[rand]}.png`;

    enemy.img = enemyImage;

    if (this.enemies.length < 4) {
      this.enemies.push(enemy);
    }
  }
//Ester
  spawnCloud() {
    const y = Math.floor(Math.random() * centerY_canvas);

    const cloud = {
      x: canvas.width + 1000,
      y: y,
      width: 200,
      height: 100,
      img: cloudImage,
      margin: 50,
    }

    this.clouds.push(cloud);
  }

  moveEnemies() {
    for (const element of [...this.enemies, ...this.clouds]) {
      element.x -= this.speed;
    }

    this.enemies = this.enemies.filter(enemy => enemy.x > 0 - enemy.width);
    this.clouds = this.clouds.filter(cloud => cloud.x > 0 - cloud.width);
  }

  update() {
    const currentTime = new Date().getTime();

    if (currentTime - this.lastSpawn > this.spawnRate) {
      this.spawnTower();
      this.lastSpawn = currentTime;
    }

    if (currentTime - this.lastSpawnCloud > this.spawnRateCloud) {
      this.spawnCloud();
      this.lastSpawnCloud = currentTime;
    }

    this.moveEnemies();
    this.drawEnemies();

    this.spawnRate = Math.floor(Math.random() * (20000 - 500 + 1)) + 500;
    this.spawnRateCloud = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

    collisions.updateEnemies(this.enemies, this.clouds);
  }

  drawEnemies() {
    for (const element of [...this.enemies, ...this.clouds]) {
      ctx.drawImage(element.img, element.x, element.y, element.width, element.height);
    }
  }
}