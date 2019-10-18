const rectWidth = 40;
const scoreTag = document.getElementById("score");

class Controller {
  constructor (canvas) {
    this.canvas  = canvas;
    this.canvas.setHandler(this.clickHandler.bind(this));
    this.rects = [];
    this.score = 0;
    this.frameId = null;
    this.frameCount = 0;
  }
  initGame() {
    this.score = 0;
    this.rects = [];
    this.frameCount = 0;
    this.canvas.clearBoard();
    this.updateScore();
  }

  updateScore() {
    scoreTag.textContent = String(this.score);
  }

  addRandomRect() {
    const rect = {
      x: randomPos(0, this.canvas.boardWidth - rectWidth),
      y: randomPos(0, Math.round(this.canvas.boardHeight/2)),
      vy: randomPos(1, 3),
      w: rectWidth,
      color: randomColor()
    }
    this.rects.push(rect);
  }

  start () {
    this.initGame();
    this.animate.call(this);
  }

  stop () {
    cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.canvas.clearBoard();
  }

  animate () {
    this.frameCount++;
    if (this.frameCount % 30 === 0) {
      this.addRandomRect();
    }
    const newRects = [];
    this.rects.forEach(rect => {
      const newRect = this.canvas.updateRect(rect);
      if (newRect.y < this.canvas.boardHeight) {
        newRects.push(newRect);
      }
    });
    this.rects = newRects;
    this.frameId = requestAnimationFrame(this.animate.bind(this));
  }

  clickHandler(x, y) {
    const oldScore = this.score;
    const newRects = [];
    this.rects.forEach(rect => {
      if ((rect.x <= x) && (rect.x + rect.w >= x) &&
           (rect.y <= y) && (rect.y + rect.w >= y)) {
              this.score++;
              this.canvas.hideRect(rect);
      } else {
        newRects.push(rect);
      };
    });
    if (oldScore != this.score) {
      this.updateScore();
      this.rects = newRects;
    }
  }
}

let controller = new Controller(_canvas);
