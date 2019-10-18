class Canvas {
  constructor () {
    this.link = document.getElementById('canvas');
    this.link.addEventListener('click', (e)=> this.clickHandler(e));
    this.context = this.link.getContext('2d');
    this.boardWidth = this.link.clientWidth;
    this.boardHeight = this.link.clientHeight;
    this.boardX = this.link.offsetLeft;
    this.boardY = this.link.offsetTop;
  }

  drawRect(rect) {
    this.context.fillStyle = rect.color;
    this.context.fillRect(rect.x, rect.y, rect.w, rect.w);
  }

  hideRect(rect) {
    this.context.clearRect(rect.x, rect.y, rect.w, rect.w);
  }

  updateRect(rect) {
    this.hideRect(rect);
    rect.y += rect.vy;
    this.drawRect(rect);
    return rect;
  }

  clearBoard() {
    this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
  }

  setHandler(handler) {
    this.handler = handler;
  }

  clickHandler(event)  {
    const x = event.pageX - this.boardX;
    const y = event.pageY - this.boardY;
    this.handler(x, y);
  }
}

let _canvas = new Canvas();
