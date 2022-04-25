import ConnectionFigure from './ConnectionFigure';

export default class ConnectionPort {
  readonly id: string;
  connections: ConnectionFigure[];
  anchor: Element;

  constructor(id: string, anchor: Element, connections: ConnectionFigure[]) {
    this.id = id;
    this.connections = connections;
    this.anchor = anchor;
  }

  addConnection(connectionFigure: ConnectionFigure) {
    this.connections.push(connectionFigure);
  }

  removeConnection(connectionToRemove: ConnectionFigure) {
    this.connections = this.connections.filter(
      (connection) => connection.id !== connectionToRemove.id
    );
  }
}
