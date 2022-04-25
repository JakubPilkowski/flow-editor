import { Position } from 'components/Movement';
import MousePosition from 'components/Movement/MousePosition';
import DraggableFigure from './DraggableFigure';

type VertexEvents = 'vertex:dblclick' | 'vertex:drag' | 'vertex:dragend';

export default class Vertex extends DraggableFigure<SVGRectElement, VertexEvents> {
  mousePosition?: MousePosition;
  position: Position;
  locked = false;

  constructor(id: string, position: Position, color: string) {
    super('rect', id);
    this.position = position;
    this.setAttributes({
      x: position.x,
      y: position.y,
      width: 8,
      height: 8,
      fill: color,
      rx: 4,
      ry: 4,
      transform: `translate(-4,-4)`,
    });
  }

  onClick() {}

  onDoubleClick() {
    this.trigger('vertex:dblclick', this.id);
  }

  onDragStart(e: MouseEvent) {
    const { pageX, pageY } = e;
    const position = new Position(pageX, pageY);
    this.mousePosition = new MousePosition();
    this.mousePosition.setStartPosition(position);
  }

  onDrag(e: MouseEvent) {
    const mousePos = this.mousePosition;
    if (!mousePos) return;
    const { pageX, pageY } = e;
    const position = new Position(pageX, pageY);
    const { diffX, diffY } = mousePos.updatePosition(position);
    this.position.x += diffX;
    this.position.y += diffY;
    this.repaint();
    this.trigger('vertex:drag', this);
  }

  onDragEnd() {
    this.mousePosition = undefined;
    this.trigger('vertex:dragend', this);
  }

  repaint() {
    this.setAttributes({
      x: this.position.x,
      y: this.position.y,
    });
  }
}
