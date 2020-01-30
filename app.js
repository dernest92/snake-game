import { Snake } from "./modules/snake.js";
import { Goal } from "./modules/goal.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;

const goal = new Goal();
const snake = new Snake();

const stepMin = 50;
let stepAdd = 450;
let quit = false;
let boost = false;
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  if (snake.checkInternalCollision()) {
    loose();
  }
  checkGoal(snake, goal);
  checkEdges(snake);
  snake.draw(ctx);
  goal.render(ctx);
  if (!quit) {
    const timer = boost ? 50 : stepMin + stepAdd;
    setTimeout(loop, timer);
  }
}

loop();

function checkGoal(snake, goal) {
  const dx = goal.pos.x - snake.segments[0].pos.x;
  const dy = goal.pos.y - snake.segments[0].pos.y;
  if (dx === 0 && dy === 0) {
    snake.grow();
    goal.randomize();
    stepAdd *= 0.9;
  }
}

function checkEdges(snake) {
  const head = snake.segments[0];
  if (
    head.pos.x < 0 ||
    head.pos.x + 10 > canvas.width ||
    head.pos.y < 0 ||
    head.pos.y + 10 > canvas.height
  ) {
    loose(snake);
  }
}

function loose(snake) {
  quit = true;
  const head = snake.segments[0];
  head.pos = { x: 20, y: 20 };
  snake.segments = [head];
  stepAdd = 450;
  snake.dir = "right";
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
  if (e.code === "Space") {
    boost = true;
  }
}
function keyupHandler(e) {
  if (e.code === "Space") {
    boost = false;
  }
}
