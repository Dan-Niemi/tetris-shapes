class Piece {
  constructor(shape = random(C.shapes), color = random(C.colors), x = Math.floor(C.gridWidth / 2), y = Math.floor(C.gridHeight / 2)) {
    
    this.shape = shape;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  move(dir) {
    let newPosX = this.x;
    let newPosY = this.y;
    if (dir === C.left) {
      newPosX--;
    }
    if (dir === C.right) {
      newPosX++;
    }
    if (dir === C.up) {
      newPosY--;
    }
    if (dir === C.down) {
      newPosY++;
    }
    if (!this.isOutofBounds(newPosX, newPosY)) {
      this.x = newPosX;
      this.y = newPosY;
    } else {
    }
  }
  isOutofBounds(textX, testY) {
    let c = this.occupiedCells(textX, testY);
    return c.some((cell) => cell[0] < 0 || cell[0] >= C.gridWidth || cell[1] < 0 || cell[1] >= C.gridHeight);
  }

  rotateClockwise() {
    const transposed = this.shape[0].map((_, index) => this.shape.map((row) => row[index]));
    this.shape = transposed.map((row) => row.reverse());
  }

  rotateCounterClockwise() {
    const reversed = this.shape.map((row) => row.reverse());
    this.shape = reversed[0].map((_, index) => reversed.map((row) => row[index]));
  }

  occupiedCells(baseX = this.x, baseY = this.y) {
    const coordinates = [];
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          coordinates.push([baseX + x, baseY + y]);
        }
      }
    }
    return coordinates;
  }
  draw() {
    fill(this.color);
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          rect((this.x + x) * C.gridSize, (this.y + y) * C.gridSize, C.gridSize, C.gridSize);
        }
      });
    });
  }
  isAtLocation(x, y) {
    return this.occupiedCells().some((cell) => cell[0] === x && cell[1] === y);
  }
}
