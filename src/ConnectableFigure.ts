import { Position } from 'components/Movement';
import ConnectionInput from './ConnectionInput';
import ConnectionOutput from './ConnectionOutput';
import DraggableFigure from './DraggableFigure';

export default abstract class ConnectableFigure<T extends SVGElement, E> extends DraggableFigure<
  T,
  E
> {
  position: Position;
  inputs: ConnectionInput[] = [];
  outputs: ConnectionOutput[] = [];

  constructor({ tag, id, position }: ConnectableFigureArguments) {
    super(tag, id);
    this.position = position;
  }

  setInputs(inputs: ConnectionInput[]) {
    this.inputs.push(...inputs);
    // inputs.forEach((input) => (input.locked = true));
  }

  setOutputs(outputs: ConnectionOutput[]) {
    this.outputs.push(...outputs);
    // outputs.forEach((output) => (output.locked = true));
  }

  removeInput(inputToRemove: ConnectionInput) {
    this.inputs = this.inputs.filter((input) => input.id !== inputToRemove.id);
    // inputToRemove.locked = false;
  }

  removeOutput(outputToRemove: ConnectionOutput) {
    this.outputs = this.outputs.filter((output) => output.id !== outputToRemove.id);
    // outputToRemove.locked = false;
  }
}

type ConnectableFigureArguments = {
  tag: string;
  id?: string;
  position: Position;
};
