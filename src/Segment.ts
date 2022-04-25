import { Position } from 'components/Movement';

export default class Segment {
  p1: Position;
  p2: Position;
  private a: number;
  private b: number;

  constructor(p1: Position, p2: Position) {
    this.p1 = p1;
    this.p2 = p2;

    const diffY = this.p2.y - this.p1.y;

    this.a = diffY !== 0 ? (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x) : 0;
    this.b = this.p1.y - this.a * this.p1.x;
  }

  crop(amount: number) {
    const distX = this.p1.x - this.p2.x;
    const distY = this.p1.y - this.p2.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxCropAmount = Math.min(distance, amount);
    const cropX = (distX * (distance - maxCropAmount)) / distance;
    const cropY = (distY * (distance - maxCropAmount)) / distance;
    const x = this.p2.x + cropX;
    const y = this.p2.y + cropY;
    return new Segment(this.p1, new Position(x, y));
  }

  fX(x: number): number {
    return this.a * x + this.b;
  }

  isPointInSegment(p: Position) {
    const expectedY = this.a * p.x + this.b;
    return expectedY === p.y;
  }
}
