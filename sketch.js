let webcam;
let ballSystem = [];
let scaleFactor = 10;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scaleFactor, height / scaleFactor);
  webcam.hide();
  
  for (let i = 0; i < 300; i++) {
    let rx = random(width);
    let ry = random(height);
    let rr = random(5, 40);
    ballSystem.push(new Ball(rx, ry, rr));
  }
}

function draw() {
  background(0);
  webcam.loadPixels();
  
  for (let ball of ballSystem) {
    ball.move();
    ball.show();
    ball.checkEdges();
  }
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  show() {
    let px = int(this.x / scaleFactor);
    let py = int(this.y / scaleFactor);
    let index = (px + py * webcam.width) * 4;
    
    if (index >= 0 && index < webcam.pixels.length) {
      let r = webcam.pixels[index];
      let g = webcam.pixels[index + 1];
      let b = webcam.pixels[index + 2];
      fill(r, g, b, 200);
      noStroke();
      ellipse(this.x, this.y, this.r);
    }
  }

  checkEdges() {
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }
}