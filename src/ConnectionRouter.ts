import { Position } from 'components/Movement';
import PolyLine from './PolyLine';
import Segment from './Segment';

export default class ConnectionRouter {
  paint(polyline: PolyLine) {
    const vertices = polyline.vertices;
    const radius = polyline.radius;
    let vertex = vertices[0];
    const path = ['M ', vertex.x, ',', vertex.y, ' '];

    let i = 1;
    let length, inset, p2, segment;

    if (radius > 0) {
      let lastP = vertex;
      length = vertices.length - 1;
      for (; i < length; i++) {
        vertex = vertices.at(i) as Position;
        segment = new Segment(vertex, lastP);
        inset = segment.crop(radius).p2;
        path.push('L ', inset.x, ',', inset.y, ' ');

        p2 = vertices.at(i + 1) as Position;
        segment = new Segment(vertex, p2);
        inset = segment.crop(radius).p2;

        path.push('Q ', vertex.x, ',', vertex.y, ' ', inset.x, ',', inset.y, ' ');
        lastP = vertex;
      }
      vertex = vertices.at(i) as Position;
      path.push('L ', vertex.x, ',', vertex.y);
    } else {
      length = vertices.length;
      for (; i < length; i++) {
        vertex = vertices.at(i) as Position;
        path.push('L ', vertex.x, ',', vertex.y);
      }
    }
    return path.join('');
  }
}
