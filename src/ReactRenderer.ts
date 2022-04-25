import { ReactElement } from 'react';
import { NodeRenderListener } from './NodeRenderListener';
import * as ReactDOM from 'react-dom';

export default class ReactRenderer implements NodeRenderListener {
  node: ReactElement;
  constructor(node: ReactElement) {
    this.node = node;
  }

  render(container: SVGForeignObjectElement, onRender: () => void): void {
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(this.node, container, onRender);
  }
}
