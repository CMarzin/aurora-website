const sketch = p => {
  const bubObjs = [];

  p.setup = () => {
    p.createCanvas(window.innerWidth / 2, window.innerHeight / 2, p.WEBGL);
    for (let i = 0; i < 2; i++) {
      bubObjs[i] = new Bubble();
    }
    p.background(200);
  };

  p.draw = () => {
    p.background(220);
    for (let i = 0; i < bubObjs.length; i++) {
      bubObjs[i].display();
      bubObjs[i].move();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth / 2, window.innerHeight / 2);
  }

  class Bubble {
    constructor() {
      this.x = p.random(0,100);
      this.y = p.height / 2 - p.random(20, 60);
    }

    display() {
      p.stroke(0);
      p.fill(150);
      p.ellipse(this.x, this.y, 20, 20);
    }

    move() {
      if (this.y <= -300) {
        this.y = p.height / 2 - p.random(20, 60);
      }

      this.x += p.random(-5,5);
      this.y -= p.random(5, 10);
    }
  }
}

export default sketch