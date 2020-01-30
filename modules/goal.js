export class Goal {
  constructor() {
    this.pos = {
      x: Math.floor(Math.random() * 10) * 10,
      y: Math.floor(Math.random() * 10) * 10
    };
  }
  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(this.pos.x, this.pos.y, 10, 10);
    ctx.stroke();
  }
  randomize() {
    this.pos = {
      x: Math.floor(Math.random() * 49) * 10,
      y: Math.floor(Math.random() * 39) * 10
    };
  }
}
