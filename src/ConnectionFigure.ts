import { Position } from 'components/Movement';
import PolyLine from 'components/PolyLine/PolyLine';
import Segment from 'components/PolyLine/Segment';
import { nanoid } from 'nanoid';
import Figure from './Figure';
import Vertex from './Vertex';

type ConnectionFigureEvents = 'connection:update' | 'connection:remove';

export default class ConnectionFigure extends Figure<SVGGElement, ConnectionFigureEvents> {
  polyline: PolyLine;
  vertices: Vertex[];
  color: string;
  displayVertices = true;

  constructor({ id, vertices, radius, color }: ConnectionFigureArguments) {
    super('g', id);
    this.polyline = new PolyLine({ id, vertices, radius });
    this.vertices = vertices.map((vertex) => {
      return new Vertex(nanoid(), vertex, color);
    });
    this.color = color;

    this.figure.appendChild(this.polyline.figure);

    this.polyline.addListener('polyline:dblclick', (data) => {
      this.addVertex(data);
    });
    this.polyline.addListener('polyline:drag', (data) => {
      this.onPolylineMove(data);
    });
    this.polyline.addListener('polyline:dragend', () => {
      this.actionEnd();
    });

    this.vertices.forEach((vertex) => {
      this.figure.appendChild(vertex.figure);
      vertex.addListener('vertex:dblclick', (data) => this.removeVertex(data));
      vertex.addListener('vertex:drag', (data) => this.updateVertex(data));
      vertex.addListener('vertex:dragend', () => this.actionEnd());
    });

    this.setVerticesVisiblity();
  }

  setDisplayVertices(display: boolean) {
    this.displayVertices = display;
    this.setVerticesVisiblity();
  }

  setVerticesVisiblity() {
    this.vertices.forEach((vertex) => {
      vertex.setAttributes({
        visibility: this.displayVertices ? 'visible' : 'hidden',
      });
    });
  }

  addVertex(e: MouseEvent) {
    const { pageX, pageY } = e;
    const element = document.getElementById('flow-playground-svg-editor');
    if (!element) return;
    const { left, top } = element?.getBoundingClientRect() || {};

    const position = new Position(pageX - left, pageY - top);
    const id = nanoid();
    const newVertex = new Vertex(id, position, this.color);
    newVertex.addListener('vertex:dblclick', (data) => this.removeVertex(data));
    newVertex.addListener('vertex:drag', (data) => this.updateVertex(data));
    newVertex.addListener('vertex:dragend', () => this.actionEnd());
    newVertex.setAttributes({ visibility: this.displayVertices ? 'visible' : 'hidden' });

    let index = 0;
    let min = Number.MAX_VALUE;

    if (this.vertices.length > 2) {
      this.vertices.slice(0, -1).forEach((vertex, idx) => {
        const segment = new Segment(vertex.position, this.vertices[idx + 1].position);
        const diffrence = Math.abs(segment.fX(newVertex.position.x) - newVertex.position.y);
        if (diffrence < min) {
          min = diffrence;
          index = idx + 1;
        }
      });
    } else {
      index = 1;
    }

    this.figure.appendChild(newVertex.figure);
    this.vertices.splice(index, 0, newVertex);
    this.polyline.setVertices(this.vertices.map((vertex) => vertex.position));
    this.trigger('connection:update', this);
  }

  updateVertex(newVertex: Vertex) {
    this.vertices.forEach((vertex) => {
      if (vertex.id === newVertex.id) {
        vertex.position = newVertex.position;
      }
      return vertex;
    });
    this.polyline.repaint();
    // this.polyline.setVertices(this.vertices.map((vertex) => vertex.position));
  }

  removeVertex(id: string) {
    if (this.vertices.length > 2) {
      this.vertices = this.vertices.filter((vertex) => {
        if (vertex.id !== id) {
          return true;
        }
        vertex.removeAll();
        this.figure.removeChild(vertex.figure);
        return false;
      });
      this.polyline.setVertices(this.vertices.map((vertex) => vertex.position));
    } else {
      this.trigger('connection:remove', true);
    }
  }

  onPolylineMove({ diffX, diffY }: { diffX: number; diffY: number }) {
    // const affectedVertices = this.vertices.slice(1, -1);
    // affectedVertices.forEach((vertex) => {
    //   vertex.position.x += diffX;
    //   vertex.position.y += diffY;
    //   vertex.repaint();
    // });
    this.vertices.forEach((vertex) => {
      if (!vertex.locked) {
        vertex.position.x += diffX;
        vertex.position.y += diffY;
        vertex.repaint();
      }
    });
    this.polyline.repaint();
  }

  actionEnd() {
    this.trigger('connection:update', this);
  }
}

type ConnectionFigureArguments = {
  id: string;
  vertices: Position[];
  radius: number;
  color: string;
};
