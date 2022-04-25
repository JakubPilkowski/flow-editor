import ConnectionFigure from './ConnectionFigure';
import ConnectionPort from './ConnectionPort';
import ConnectionLine from '../PolyLine/ConnectionLine';
import { nanoid } from 'nanoid';
import { Position } from 'components/Movement';

export default class ConnectionInput extends ConnectionPort {
  connectionLine?: ConnectionLine;

  constructor({ id, anchor, connections }: ConnectionInputArguments) {
    super(id, anchor, connections);
    this.init();
  }

  init() {
    this.anchor.addEventListener('mousedown', (e) => {
      console.log('on mouse down');
      e.stopPropagation();
      const { pageX, pageY } = e as MouseEvent;
      const editor = document.getElementById('flow-playground-svg-editor');
      const { left, top } = editor?.getBoundingClientRect() || {};
      const position = new Position(pageX - left, pageY - top);
      this.connectionLine = new ConnectionLine({ id: nanoid(), position });
      // this.anchor.appendChild(this.connectionLine.figure);
      editor?.appendChild(this.connectionLine.figure);
      this.connectionLine.arrow.handleDragStart(e as MouseEvent);
      this.connectionLine.arrow.addListener('arrow:dragend', ({ event, figure }) => {
        // editor?.removeChild(this.connectionLine.figure);
        this.connectionLine = undefined;
      });
    });

    // this.connectionLine?.addListener('connectionline:dragend', (e) => {
    //   this.connectionLine = undefined;
    // });
  }
}

type ConnectionInputArguments = {
  id: string;
  anchor: Element;
  connections: ConnectionFigure[];
};
