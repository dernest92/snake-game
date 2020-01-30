import { Segment } from "./segment.js";

export class Snake {
  constructor() {
    this.dir = "right";
    const head = new Segment({
      pos: { x: 10, y: 10 }
    });
    this.segments = [head];

    document.addEventListener("keydown", e => this.handleInput(e));
  }

  handleInput(e) {
    if (e.key === "a" && this.dir === "right") return;
    if (e.key === "s" && this.dir === "up") return;
    if (e.key === "d" && this.dir === "left") return;
    if (e.key === "w" && this.dir === "down") return;

    switch (e.key) {
      case "s":
        this.dir = "down";
        break;
      case "a":
        this.dir = "left";
        break;
      case "w":
        this.dir = "up";
        break;
      case "d":
        this.dir = "right";
        break;
    }
  }

  grow() {
    const lastSeg = this.segments[this.segments.length - 1];
    const seg = new Segment({
      pos: { ...lastSeg.lastPos },
      ctx: this.ctx
    });
    this.segments.push(seg);
  }

  checkInternalCollision() {
    const head = this.segments[0];
    for (let i = 1; i < this.segments.length; i++) {
      const dx = this.segments[i].pos.x - head.pos.x;
      const dy = this.segments[i].pos.y - head.pos.y;
      if (dx === 0 && dy === 0) {
        console.log("yo you bit yoself");
        return true;
      }
    }
    return false;
  }

  update() {
    const head = this.segments[0];
    head.lastPos = { ...head.pos };
    switch (this.dir) {
      case "right":
        head.pos.x += 10;
        break;
      case "down":
        head.pos.y += 10;
        break;
      case "left":
        head.pos.x -= 10;
        break;
      case "up":
        head.pos.y -= 10;
        break;
    }
    for (let i = 1; i < this.segments.length; i++) {
      this.segments[i].lastPos = { ...this.segments[i].pos };
      this.segments[i].pos = { ...this.segments[i - 1].lastPos };
    }
  }
  draw(ctx) {
    this.segments.forEach(s => s.render(ctx));
  }
}
