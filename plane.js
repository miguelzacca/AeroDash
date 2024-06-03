class Plane {
  constructor(speed) {
    this.speed = speed;
    this.height = (planeLevel == 4 || planeLevel == 3) ? 55 : 50;
    this.plane = {
      width: 175,
      height: this.height,
      x: 150,
      y: centerY_canvas - this.height * .5,
      targetY: centerY_canvas - this.height * .5,
      angle: 0,
      maxAngle: 3,
      angleSpeed: .5,
    };
  }

  draw() {
    ctx.save();
    ctx.translate(this.plane.x + this.plane.width * .5, this.plane.y + this.plane.height * .5);
    ctx.rotate((this.plane.angle * Math.PI) / 180);
    ctx.drawImage(planeImage, -this.plane.width * .5, -this.plane.height * .5, this.plane.width, this.plane.height);
    ctx.restore();
  }

  updatePosition() {
    const moveY = Math.abs(this.plane.targetY - this.plane.y) * .15;

    if (this.plane.targetY > this.plane.y + this.speed) {
      this.plane.y += moveY;
      this.updateAngle(this.plane.angleSpeed);
    } else if (this.plane.targetY < this.plane.y - this.speed) {
      this.plane.y -= moveY;
      this.updateAngle(-this.plane.angleSpeed);
    } else {
      this.returnInitialAngle();
    }
  }

  updateAngle(speed) {
    if (this.plane.angle < this.plane.maxAngle && this.plane.angle > -this.plane.maxAngle) {
      this.plane.angle += speed * .75;
    }
  }

  returnInitialAngle() {
    if (this.plane.angle > 0) {
      this.plane.angle -= this.plane.angleSpeed;
    } else if (this.plane.angle < 0) {
      this.plane.angle += this.plane.angleSpeed;
    }
  }

  move(mouseY) {
    mouseY = Math.floor(mouseY);
    if (this.plane.y != mouseY) {
      this.plane.targetY = mouseY;
    }
  }
}

//Guilherme

class Collisions {
  constructor(player, enemies, clouds) {
    this.player = player;
    this.enemies = enemies;
    this.clouds = clouds;
    this.gameOver = false;
  }

  updateEnemies(enemies, clouds) {
    this.enemies = enemies;
    this.clouds = clouds;
  }

  checkCollisions() {
    for (const element of [...this.enemies, ...this.clouds]) {
      if (this.collided(this.player, element)) {
        this.gameOver = true;
        break;
      }
    }
  }

  collided(obj1, obj2) {
    const margin = obj2.margin;
    return obj1.x + obj1.width - margin >= obj2.x &&
      obj1.x + margin <= obj2.x + obj2.width &&
      obj1.y + obj1.height - margin >= obj2.y &&
      obj1.y + margin <= obj2.y + obj2.height;
  }

  update() {
    this.checkCollisions();
    return this.gameOver;
  }
}