import Figure from './Figure';

export interface FigureSerializer {
  serialize(): Record<string, any>;
  deserialize(data: Record<string, any>): Figure<any, any>;
}
