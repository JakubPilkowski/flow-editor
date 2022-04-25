import { Position } from 'components/Movement/MovementContext';
import Figure from 'components/Editor/Figure';

export default class Line extends Figure<SVGLineElement, ''> {
  p1: Position;
  p2: Position;

  constructor(id: string, p1: Position, p2: Position) {
    super('line', id);
    this.p1 = p1;
    this.p2 = p2;

    this.setAttributes({
      stroke: 'red',
      ['stroke-width']: 2,
      ['stroke-dasharray']: '8 4',
    });
    this.repaint();
  }

  setTargetPoint(position: Position) {
    this.p2 = position;
    this.repaint();
  }

  repaint() {
    this.setAttributes({
      x1: this.p1.x,
      x2: this.p2.x,
      y1: this.p1.y,
      y2: this.p2.y,
    });
  }
}
