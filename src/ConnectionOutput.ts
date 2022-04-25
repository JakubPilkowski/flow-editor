import ConnectionFigure from './ConnectionFigure';
import ConnectionPort from './ConnectionPort';

export default class ConnectionOutput extends ConnectionPort {
  constructor({ id, anchor, connections }: ConnectionOutputArguments) {
    super(id, anchor, connections);
    this.init();
    // const connectionAdd = new CustomEvent('connectionadd', {
    //   detail: {},
    // });

    // const connectionRemove = new CustomEvent('connectionremove', {});
  }

  init() {
    this.anchor.addEventListener('connectionadd', ((event: CustomEvent<ConnectionFigure>) => {
      const { detail } = event;
      this.addConnection(detail);
    }) as EventListener);
  }
}

type ConnectionOutputArguments = {
  id: string;
  anchor: Element;
  connections: ConnectionFigure[];
};
