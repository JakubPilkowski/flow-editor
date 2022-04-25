import Figure from './Figure';

export default abstract class DraggableFigure<T extends SVGElement, E> extends Figure<T, E> {
  private hasMoved = false;
  isDraggable = true;

  constructor(tag: string, id?: string) {
    super(tag, id);
    this.figure.addEventListener('mousedown', (e) => {
      this.handleDragStart(e);
    });
    this.figure.addEventListener('click', (e) => {
      this.handleClick(e);
    });
    this.figure.addEventListener('dblclick', (e: MouseEvent) => {
      this.handleDoubleClick(e);
    });
  }

  abstract onClick(e: MouseEvent): void;
  abstract onDoubleClick(e: MouseEvent): void;
  abstract onDragStart(e: MouseEvent): void;
  abstract onDrag(e: MouseEvent): void;
  abstract onDragEnd(e: MouseEvent): void;

  private handleClick(e: MouseEvent) {
    if (!this.hasMoved) {
      this.onClick(e);
      return;
    }
    this.hasMoved = false;
  }

  private handleDoubleClick(e: MouseEvent) {
    if (!this.hasMoved) {
      this.onDoubleClick(e);
      return;
    }
    this.hasMoved = false;
  }

  handleDragStart(e: MouseEvent) {
    if (!this.isDraggable) return;
    if (typeof e.button !== 'number' || e.button !== 0) return;
    e.stopPropagation();
    document.addEventListener('mousemove', (e) => this.handleDrag(e), { capture: true });
    document.addEventListener('mouseup', (e) => this.handleDragEnd(e), { capture: true });
    this.onDragStart(e);
  }

  private handleDrag(e: MouseEvent) {
    this.hasMoved = true;
    this.onDrag(e);
  }

  private handleDragEnd(e: MouseEvent) {
    e.stopPropagation();
    document.removeEventListener('mousemove', this.handleDrag, { capture: true });
    document.removeEventListener('mouseup', this.handleDragEnd, { capture: true });
    this.onDragEnd(e);
  }
}
