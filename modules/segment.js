export class Segment {
  constructor(props) {
    const { pos, vel, ctx } = props;
    this.pos = pos;
    this.vel = vel;
    this.ctx = ctx;
  }
  update() {
    this.lastPos = { ...this.pos };
    this.lastVel = { ...this.vel };
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  render() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
  }
}
