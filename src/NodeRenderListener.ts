export interface NodeRenderListener {
  render(container: SVGForeignObjectElement, onRender: () => void): void;
}
