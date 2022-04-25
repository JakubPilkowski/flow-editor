import { nanoid } from 'nanoid';
import EventEmitter from 'views/BotCreator/classes/EventEmitter';

export default class Figure<T extends SVGElement, E> extends EventEmitter<E> {
  figure: T;
  id: string;

  constructor(tag: string, id?: string) {
    super();
    this.id = id || nanoid();
    this.figure = document.createElementNS('http://www.w3.org/2000/svg', tag) as T;
    // this.figure.dataset.figure = this;
    // this.figure.attributes.figureData =
  }

  setAttributes(attributes: Record<string, any>) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.figure.setAttributeNS(null, key, value);
    });
  }
}
