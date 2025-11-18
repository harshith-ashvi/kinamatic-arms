export class KinematicArm {
  x: number;
  y: number;
  length: number;
  angle: number;
  parent: null | KinematicArm;
  constructor(x: number, y: number, length: number, angle: number) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.parent = null;
  }

  createArm(x: number, y: number, length: number, angle: number): KinematicArm {
    return new KinematicArm(x, y, length, angle);
  }

  init(x: number, y: number, length: number, angle: number): void {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
  }

  getAbsoluteAngle(): number {
    let angle = this.angle;
    let parent = this.parent;
    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return angle;
  }

  getEndX() {
    return this.x + Math.cos(this.getAbsoluteAngle()) * this.length;
  }

  getEndY() {
    return this.y + Math.sin(this.getAbsoluteAngle()) * this.length;
  }

  renderArm(context: CanvasRenderingContext2D) {
    context.lineWidth = 5;
    context.strokeStyle = "#000";

    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
}

export function drawPath(
  ctx: CanvasRenderingContext2D,
  path: { x: number; y: number }[]
) {
  if (path.length < 2) return;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();
}
