

function setup() {
  createCanvas(C.gridWidth * C.gridSize, C.gridHeight * C.gridSize);
  colorMode(HSL);
  stroke(75);
  Alpine.store("g").pieces.push(new Piece());
}

function draw() {
  background(90);
  drawGrid();
  G.pieces.forEach((piece) => piece.draw());
}

function mousePressed() {
  let gridX = Math.floor(mouseX / C.gridSize);
  let gridY = Math.floor(mouseY / C.gridSize);
  G.selectedPiece = G.pieces.find((piece) => piece.isAtLocation(gridX, gridY));
  console.log(G.selectedPiece);
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
