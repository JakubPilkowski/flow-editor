import { Position } from 'components/Movement';
import Figure from 'components/Editor/Figure';
import { nanoid } from 'nanoid';
import Arrow from './Arrow';
import Line from './Line';

type ConnectionLineEvents = 'connectionline:drag' | 'connectionline:dragend';

export default class ConnectionLine extends Figure<SVGGElement, ConnectionLineEvents> {
  lineAttributes: Record<string, any> = {};
  line: Line;
  arrow: Arrow;

  constructor({ id, position }: ConnectionLineArguments) {
    super('g', id);
    this.line = new Line(nanoid(), position.clone(), position.clone());
    this.arrow = new Arrow(nanoid(), position, 'red');
    this.figure.appendChild(this.line.figure);
    this.figure.appendChild(this.arrow.figure);

    this.arrow.addListener('arrow:drag', (data) => this.handleArrowDrag(data));
    this.arrow.addListener('arrow:dragend', (data) => this.handleArrowDragEnd(data));
  }

  handleArrowDrag({ event, figure }: { event: MouseEvent; figure: Arrow }) {
    const { target, currentTarget } = event as MouseEvent;
    figure.setAttributes({ visibility: 'hidden' });
    const droppableElement = document.elementFromPoint(event.pageX, event.pageY);

    if (droppableElement?.classList.contains('connection-output')) {
      console.log('jesteśmy w domu');
      droppableElement.classList.add('connection-output--hover');
    }

    figure.setAttributes({ visibility: 'visible' });
    this.line.setTargetPoint(figure.position);
    // console.log(target);
    // console.log(currentTarget);
    // console.log(event);
    // console.log(target.className);
  }

  handleArrowDragEnd({ event, figure }) {
    const { target, currentTarget } = event as MouseEvent;
    console.log(target);
    // console.log(target.className);
    // this.trigger('connectionline:addconnection', )
  }
}

type ConnectionLineArguments = {
  id?: string;
  position: Position;
};
