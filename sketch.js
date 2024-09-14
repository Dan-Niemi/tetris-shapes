function setup() {
  cnv = createCanvas(C.gridWidth * C.gridSize, C.gridHeight * C.gridSize);
  cnv.elt.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  colorMode(HSL);
  stroke(75);
  G.pieces.push(new Piece());
}

function draw() {
  background(90);
  drawGrid();
  G.pieces.forEach((piece) => piece.draw());
  G.selectedPiece && G.selectedPiece.mouseMove();
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (G.selectedPiece) {
      G.selectedPiece = null;
    } else {
      G.selectedPiece = G.pieces.find((piece) => piece.isAtLocation(toGrid(mouseX), toGrid(mouseY)));
    }
  } else if (mouseButton === RIGHT) {
    G.pieces.push(new Piece({x:toGrid(mouseX),y:toGrid(mouseY)}))
  }
}
function keyPressed() {
  if (!G.selectedPiece) {
    return;
  }
  if (key === "a") {
    G.selectedPiece.keyboardMove(C.left);
  }
  if (key === "w") {
    G.selectedPiece.keyboardMove(C.up);
  }
  if (key === "d") {
    G.selectedPiece.keyboardMove(C.right);
  }
  if (key === "s") {
    G.selectedPiece.keyboardMove(C.down);
  }
  if (key === "e") {
    G.selectedPiece.rotateClockwise();
  }
  if (key === "q") {
    G.selectedPiece.rotateCounterClockwise();
  }
  if (key === "n") {
    G.pieces[0] = new Piece();
  }
}

function drawGrid() {
  push();
  textAlign(CENTER, CENTER);
  textSize(11);
  fill(50); // Light grey color for the text

  for (let x = 0; x <= width; x += C.gridSize) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += C.gridSize) {
    line(0, y, width, y);
  }
  noStroke();
  // Add cell coordinates
  for (let x = 0; x <= width - C.gridSize; x += C.gridSize) {
    for (let y = 0; y <= height - C.gridSize; y += C.gridSize) {
      let coordX = Math.floor(x / C.gridSize);
      let coordY = Math.floor(y / C.gridSize);
      text(`${coordX},${coordY}`, x + C.gridSize / 2, y + C.gridSize / 2);
    }
  }
  pop();
}

function toGrid(pos){
  return floor(pos / C.gridSize);
}
function toScreen(pos){
  return floor(pos * C.gridSize);
}