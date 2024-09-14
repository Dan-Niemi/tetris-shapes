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
  getInput();
  drawGrid();
  G.pieces.forEach((piece) => piece.draw());
  G.selectedPiece && G.selectedPiece.mouseMove();
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (G.selectedPiece) {
      G.selectedPiece = null;
    } else {
      G.selectedPiece = G.pieces.find((piece) => piece.isAtLocation(G.toGrid(mouseX), G.toGrid(mouseY)));
    }
  } else if (mouseButton === RIGHT) {
    let newPiece = new Piece({ x: G.toGrid(mouseX), y: G.toGrid(mouseY) });
    G.pieces.push(newPiece);
    G.selectedPiece = newPiece;
  }
}
function mouseWheel(event) {
  if (!G.selectedPiece) {
    return false;
  }
  event.delta > 0 ? G.selectedPiece.rotate(C.counterClockwise) : G.selectedPiece.rotate(C.clockwise);
}

function keyPressed() {
  if (key === "n") {G.pieces[0] = new Piece();}
  if(!G.selectedPiece){return}
  if (key === "e") {G.selectedPiece.rotate(C.clockwise);}
  if (key === "q") {G.selectedPiece.rotate(C.counterClockwise);}
}
function getInput(){
  if(!G.selectedPiece){return}
  if (keyIsDown(65)){G.selectedPiece.keyboardMove(C.left);}
  if (keyIsDown(68)){G.selectedPiece.keyboardMove(C.right);}
  if (keyIsDown(87)){G.selectedPiece.keyboardMove(C.up);}
  if (keyIsDown(83)){G.selectedPiece.keyboardMove(C.down);}
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

