import Figure from './Figure';

export default class Editor {
  root: HTMLElement;
  figures: Figure<any, any>[];

  constructor(root: HTMLElement, figures: Figure<any, any>[] = []) {
    this.root = root;
    this.figures = figures;
  }

  add(figure: Figure<any, any>) {
    this.root.appendChild(figure.figure);
    this.figures.push(figure);
  }

  remove(figureToRemove: Figure<any, any>) {
    this.figures = this.figures.filter((figure) => {
      if (figure.id === figureToRemove.id) {
        this.root.removeChild(figureToRemove.figure);
        return false;
      }
      return true;
    });
  }
}
