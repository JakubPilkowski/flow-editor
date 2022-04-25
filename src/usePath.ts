import { Position } from 'components/Movement';
import MousePosition from 'components/Movement/MousePosition';
import { useCallback, useRef } from 'react';
import Path from './ConnectionFigure';

type UsePath = {
  onDragStart: (e: React.MouseEvent<HTMLElement>) => void;
  onDrag: (e: MouseEvent) => void;
  onDragEnd: (e: MouseEvent) => void;
};

export default function usePath(): UsePath {
  const dragPosition = useRef<MousePosition | null>(null);
  const path = useRef<Path | null>(null);
  const editor = useRef<HTMLElement | null>(null);

  const onDragStart = useCallback((e: React.MouseEvent<HTMLElement>) => {
    editor.current = document.getElementById('flow-playground-svg-editor');
    if (!editor.current) return;
    path.current = new Path();
    const { left, top } = editor.current.getBoundingClientRect();
    const position = new Position(e.pageX - left, e.pageY - top);
    dragPosition.current = new MousePosition();
    dragPosition.current?.setStartPosition(position);
    editor.current.appendChild(path.current.element);
    return true;
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    const drag = dragPosition.current;
    if (!drag || !editor.current) return;
    const { left, top } = editor.current.getBoundingClientRect();
    const { x: currentX, y: currentY } = new Position(e.pageX - left, e.pageY - top);

    const { x, y } = drag.startPosition;
    path.current?.setPath(['M', x, y, 'L', currentX, currentY, 'Z'].join(' '));
    // path.current?.setAttributes({
    //   d: ['M', x, y, 'L', currentX, currentY, 'Z'].join(' '),
    // });
  }, []);

  const onDragEnd = useCallback(() => {
    if (!path.current || !editor.current) return;
    // editor.current.removeChild(path.current.element);
    // path.current = null;
    // dragPosition.current = null;
    return true;
  }, []);

  return { onDragStart, onDrag, onDragEnd };
}
