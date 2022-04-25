import { Position } from 'components/Movement';
import MousePosition from 'components/Movement/MousePosition';
import DraggableFigure from 'components/Editor/DraggableFigure';

type ArrowEvents = 'arrow:dblclick' | 'arrow:drag' | 'arrow:dragend';

export default class Arrow extends DraggableFigure<SVGRectElement, ArrowEvents> {
  mousePosition?: MousePosition;
  position: Position;
  locked = false;

  constructor(id: string, position: Position, color: string) {
    super('rect', id);
    this.position = position;
    this.setAttributes({
      x: position.x,
      y: position.y,
      width: 12,
      height: 12,
      fill: color,
      rx: 6,
      ry: 6,
      transform: `translate(-6,-6)`,
    });
  }

  onClick() {}

  onDoubleClick() {
    this.trigger('arrow:dblclick', this.id);
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
    this.trigger('arrow:drag', {
      event: e,
      figure: this,
    });
    this.repaint();
  }

  onDragEnd(e: MouseEvent) {
    this.mousePosition = undefined;
    this.trigger('arrow:dragend', {
      event: e,
      figure: this,
    });
  }

  repaint() {
    this.setAttributes({
      x: this.position.x,
      y: this.position.y,
    });
  }
}
