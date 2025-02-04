# workshop_9
link:https://pluto278.github.io/workshop_9

# Tasks

- Create an experimental "smart mirror" using real-time video capture.
- Implement pixel-level manipulation to create a unique visual effect.
- Use object-oriented programming to manage a system of balls that interact with the video feed.
- Display the video feed with a creative overlay of colored balls.

# Notes

## 1. Real-Time Video Capture

The project uses the `createCapture(VIDEO)` function to capture real-time video from the webcam. The video feed is then manipulated at the pixel level to create a unique visual effect.
```
webcam = createCapture(VIDEO);
webcam.size(width / scaleFactor, height / scaleFactor);
webcam.hide();
```

## 2. Pixel-Level Manipulation
The video feed is processed at the pixel level to determine the color of each ball. The color of each ball is set based on the corresponding pixel in the video feed.
```
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
```

## 3. Ball System
The project uses a system of balls that move around the canvas and change color based on the video feed. Each ball is an instance of the Ball class.
```
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
```
