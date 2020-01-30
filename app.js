import { Segment } from "./modules/segment.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;

const food = {
  pos: {
    x: Math.floor(Math.random() * 10) * 10,
    y: Math.floor(Math.random() * 10) * 10
  },
  render() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
  },
  randomize() {
    this.pos = {
      x: Math.floor(Math.random() * 49) * 10,
      y: Math.floor(Math.random() * 39) * 10
    };
  }
};

const segment = new Segment({
  pos: { x: 10, y: 10 },
  vel: { x: 10, y: 0 },
  ctx
});

const snake = {
  segments: [segment],
  updateSegments() {
    this.segments[0].update();
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i + 1]) {
        this.segments[i + 1].pos = { ...this.segments[i].lastPos };
        this.segments[i].lastPos = { ...this.segments[i].pos };
      }
    }
  },
  draw() {
    this.updateSegments();
    this.checkFood(food);
    this.segments.forEach(s => s.render());
  },
  checkFood(fd) {
    const dx = this.segments[0].pos.x - fd.pos.x;
    const dy = this.segments[0].pos.y - fd.pos.y;
    if (dx === 0 && dy === 0) {
      this.grow();
      fd.randomize();
      stepSize -= 50;
    }
  },
  getLastSegment() {
    return this.segments[this.segments.length - 1];
  },
  grow() {
    const lastSeg = this.getLastSegment();
    const seg = new Segment({
      pos: { ...lastSeg.lastPos },
      vel: { ...lastSeg.lastVel },
      ctx
    });
    this.segments.push(seg);
  }
};

let stepSize = 500;
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw();
  food.render();
  setTimeout(loop, stepSize);
}

loop();

document.addEventListener("keydown", handleInput);

function handleInput(e) {
  switch (e.key) {
    case "s":
      snake.segments[0].vel.x = 0;
      snake.segments[0].vel.y = 10;
      break;
    case "a":
      snake.segments[0].vel.x = -10;
      snake.segments[0].vel.y = 0;
      break;
    case "w":
      snake.segments[0].vel.x = 0;
      snake.segments[0].vel.y = -10;
      break;
    case "d":
      snake.segments[0].vel.x = 10;
      snake.segments[0].vel.y = 0;
      break;
  }
}
