import Figure from './Figure';
import Vertex from './Vertex';

type Container = Figure<any, any> | SVGElement | HTMLElement;

export default class ConnectionContainer {
  id: string;
  element: Container;
  vertices: Vertex[];

  constructor(id, element) {}
}
