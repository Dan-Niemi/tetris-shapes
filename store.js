document.addEventListener("alpine:init", () => {

  Alpine.store("g", {
    pieces:[],
		selectedPiece:null,
  });
  window.G = Alpine.store('g')
});
