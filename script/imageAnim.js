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
			console.log("You're dragging something over me!");
		});

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log("You dropped something on me!");

			let piece = e.dataTransfer.getData("text/plain");

			// bug 1 - if else function for the dropzone to make sure a piece cannot be dropped on top of another one that is already dropped on the gameboard.
			if (!zone.innerHTML) {
				e.target.appendChild(document.querySelector(`#${piece}`)); //one piece is dropped
				console.log("Are you sure that piece fits there? :)")
			} else {
				return;
			}
			//alternate solution - set the property's child to IF greater than 0;
		});
	})

	//drag and drop functionality goes here

	function resetPuzzlePieces(){

		// debugger;
		piecesBoard.innerHTML = "";
		createPuzzlepieces(this.dataset.puzzleref)
	dropZones.forEach(zone => {
		zone.innerHTML = "";
	//bug 2 - reset the puzzles back to their place when the game board is switched
	});
	}

	puzzleSelectors.forEach(puzzle => puzzle.addEventListener("click", resetPuzzlePieces));

	createPuzzlepieces(0);
})();
