import { Position } from 'components/Movement';
import MousePosition from 'components/Movement/MousePosition';
import ConnectableFigure from './ConnectableFigure';
import ConnectionInput from './ConnectionInput';
import ConnectionOutput from './ConnectionOutput';
import { NodeRenderListener } from './NodeRenderListener';
import Vertex from './Vertex';

type NodeFigureEvents = 'node:' | 'node:';

export default class NodeFigure extends ConnectableFigure<
  SVGForeignObjectElement,
  NodeFigureEvents
> {
  mousePosition?: MousePosition;

  constructor({ id, position, inputs = [], outputs = [], renderListener }: NodeFigureArguments) {
    super({ tag: 'foreignObject', id, position });
    renderListener.render(this.figure, () => this.findContainers());
    this.setAttributes({
      x: position.x,
      y: position.y,
      width: 200,
      height: 200,
    });

    this.setInputs(inputs);
    this.setOutputs(outputs);
  }

  findContainers() {
    const outputElements = this.figure.getElementsByClassName('connection-output');
    const inputElements = this.figure.getElementsByClassName('connection-input');
    const outputs = [];
    const inputs = [];
    for (let i = 0; i < outputElements.length; i++) {
      const outputElement = outputElements.item(i);
      if (outputElement) {
        const output = new ConnectionOutput({
          id: outputElement.id,
          connections: [],
          anchor: outputElement,
        });
        outputs.push(output);
      }
    }
    for (let i = 0; i < inputElements.length; i++) {
      const inputElement = inputElements.item(i);
      if (inputElement) {
        const input = new ConnectionInput({
          id: inputElement.id,
          connections: [],
          anchor: inputElement,
        });
        inputs.push(input);
      }
    }
    this.setInputs(inputs);
    this.setOutputs(outputs);
  }

  onClick(e: MouseEvent): void {}

  onDoubleClick(e: MouseEvent): void {}

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
    // this.inputs.forEach((input) => {
    //   input.position.x += diffX;
    //   input.position.y += diffY;
    //   input.repaint();
    //   input.trigger('vertex:drag', input);
    // });
    // this.outputs.forEach((output) => {
    //   output.position.x += diffX;
    //   output.position.y += diffY;
    //   output.repaint();
    //   output.trigger('vertex:drag', output);
    // });
    this.trigger('node:', this);
  }

  onDragEnd() {
    this.mousePosition = undefined;
    this.trigger('node:', this);
  }

  repaint() {
    this.setAttributes({
      x: this.position.x,
      y: this.position.y,
    });
  }
}

type NodeFigureArguments = {
  id: string;
  position: Position;
  inputs?: ConnectionInput[];
  outputs?: ConnectionOutput[];
  //   html: string;
  renderListener: NodeRenderListener;
};
