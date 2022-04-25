import { NodeRenderListener } from './NodeRenderListener';

export default class HTMLRenderListener implements NodeRenderListener {
  html: string;

  constructor(html: string) {
    this.html = html;
  }

  render(container: SVGForeignObjectElement, onRender: () => void): void {
    container.innerHTML = this.html;
    onRender();
  }
}
