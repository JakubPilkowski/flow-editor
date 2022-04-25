import { Position } from 'components/Movement';
import MousePosition from 'components/Movement/MousePosition';
import DraggableFigure from 'components/Editor/DraggableFigure';
import EventEmitter from 'views/BotCreator/classes/EventEmitter';
import ConnectionRouter from './ConnectionRouter';

type PolylineEvents = 'polyline:dblclick' | 'polyline:drag' | 'polyline:dragend';

export default class PolyLine extends DraggableFigure<SVGPathElement, PolylineEvents> {
  mousePosition?: MousePosition;
  router: ConnectionRouter = new ConnectionRouter();
  vertices: Position[];
  radius: number;

  constructor({ id, vertices, radius }: PolyLineArguments) {
    super('path', id);
    this.vertices = vertices;
    this.radius = radius;
    this.setAttributes({
      ['stroke-linecap']: 'round',
      stroke: '#129ce4',
      ['stroke-width']: '2',
      fill: 'transparent',
    });
    this.repaint();
  }

  setVertices(vertices: Position[]) {
    this.vertices = vertices;
    this.repaint();
  }

  setRadius(radius: number) {
    this.radius = radius;
    this.repaint();
  }

  onClick(e: MouseEvent): void {}

  onDoubleClick(e: MouseEvent): void {
    this.trigger('polyline:dblclick', e);
  }

  onDragStart(e: MouseEvent): void {
    const { pageX, pageY } = e;
    const position = new Position(pageX, pageY);
    this.mousePosition = new MousePosition();
    this.mousePosition.setStartPosition(position);
  }

  onDrag(e: MouseEvent): void {
    const mousePos = this.mousePosition;
    if (!mousePos) return;
    const { pageX, pageY } = e;
    const position = new Position(pageX, pageY);
    const { diffX, diffY } = mousePos.updatePosition(position);
    this.trigger('polyline:drag', { diffX, diffY });
  }

  onDragEnd(): void {
    this.mousePosition = undefined;
    this.trigger('polyline:dragend', true);
  }

  addVertex(position: Position) {
    this.vertices.push(position);
  }

  repaint() {
    const path = this.router.paint(this);
    this.setAttributes({ d: path });
  }
}

type PolyLineArguments = {
  vertices: Position[];
  radius: number;
  id: string;
};
