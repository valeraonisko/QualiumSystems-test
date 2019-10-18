function randomPos(pMin, pMax) {
  return Math.round(Math.random() * (pMax - pMin) + pMin);
}

function randomColor() {
  const r = randomPos(0, 255);
  const g = randomPos(0, 255);
  const b = randomPos(0, 255);
  return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}
