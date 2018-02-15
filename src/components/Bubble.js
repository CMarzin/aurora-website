/* eslint no-undef: 1 */
import { getContainerSize } from './Sketch';

export default class Bubble {
  constructor() {
    this.init()
  }

  init() {
    const container = getContainerSize()
    this.x = random(-container.width/2, container.width/2);
    this.y = container.height / 2 - window.random(20, 60);
    this.size = random(5, 25);
  }

  display() {
    stroke(135, 222, 250);
    strokeWeight(8);
    ellipse(this.x, this.y, this.size);
  }

  move() {
    if (this.y <= -500) {
      this.init()
    }

    this.x += random(-4, 4);
    this.y -= random(5, 10);
  }
}