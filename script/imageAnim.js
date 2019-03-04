(() => {
	const pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	let piecesBoard = document.querySelector(".puzzle-pieces"),
		puzzleBoard = document.querySelector(".puzzle-board"),
		puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	let dropZones = document.querySelectorAll('.drop-zone');

	function createPuzzlepieces(pictureIndex){
		// debugger;
		pieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img draggable id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="thumbnail">`;

			piecesBoard.innerHTML += newPuzzlePiece;
 		})

 		puzzleBoard.style.backgroundImage = `url(./images/backGround${pictureIndex}.jpg)`;

 		initDrag();
 		
	}

	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				console.log('draggin...')
			e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	//handle dragover and drop
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log("You dropped over me!");
		});

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log("You dropped something on me!");

			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));
		});
	})

	//drag and drop functionality goes here

	function resetPuzzlePieces(){
		// debugger;
		piecesBoard.innerHTML = "";
		createPuzzlepieces(this.dataset.puzzleref)
	}

	puzzleSelectors.forEach(puzzle => puzzle.addEventListener("click", resetPuzzlePieces));

	createPuzzlepieces(0);
})();
