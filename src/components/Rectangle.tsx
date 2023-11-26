export class Rectangle {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  className: string;

  constructor(rect: any) {
    this.id = rect.id;
    this.x = rect.x;
    this.y = rect.y;
    this.height = rect.height;
    this.width = rect.width;
    this.className = rect.labelClass;
  }
}
