document.addEventListener("alpine:init", () => {
  Alpine.store("g", {
    pieces: [],
    selectedPiece: null,
    toGrid(pos) {
      return floor(pos / C.gridSize);
    },
    toScreen(pos) {
      return floor(pos * C.gridSize);
    },
  });
  window.G = Alpine.store("g");
});
