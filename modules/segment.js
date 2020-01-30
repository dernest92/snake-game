export class Segment {
  constructor(props) {
    const { pos, vel, ctx } = props;
    this.pos = pos;
    this.vel = vel;
    this.ctx = ctx;
  }

  render(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(this.pos.x, this.pos.y, 10, 10);
    ctx.stroke();
  }
}
