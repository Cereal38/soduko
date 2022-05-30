
import React, { useState } from 'react';
import '../styles/components/Grid.css';
import Digit from './Digit.js';
import DigitsSelector from './DigitsSelector.js';


const grid = [
	[[2, 3, 0], [1, 5, 6], [0, 0, 7]], 
	[[0, 1, 9], [7, 0, 0], [0, 6, 0]], 
	[[5, 7, 6], [0, 8, 3], [2, 0, 4]], 
	[[0, 7, 5], [0, 1, 0], [3, 2, 0]], 
	[[0, 3, 0], [0, 7, 0], [0, 5, 6]], 
	[[1, 6, 2], [0, 9, 0], [0, 4, 8]], 
	[[0, 4, 1], [5, 9, 2], [0, 0, 3]], 
	[[5, 9, 0], [6, 8, 7], [0, 2, 0]], 
	[[6, 2, 0], [4, 3, 1], [0, 5, 0]],
]

// Create an array full of empties string (Same format as grids)
function createEmptyArray() {

	let array = [];
	for (let i = 0; i < 9; i++) {

		array.push([]);

		for (let j = 0; j < 3; j++) {

			array[i].push([]);

			for (let k = 0; k < 3; k++) { array[i][j].push(""); }
		}
	}

	return array;
}

const Grid = () => {
	

	const [userGrid, setUserGrid] = useState(grid);
	const [colorsGrid, setColorsGrid] = useState(createEmptyArray());
	const [selectedCell, setSelectedCell] = useState([0, 0, 0])

	// Get digit selected in the digitsSelector
	const [selectedDigit, setSelectedDigit] = useState();
	const selectDigit = (digit) => { setSelectedDigit(digit); }

	// Allow to refresh components (MAYBE DELETE)
	const [refresh, setRefresh] = useState(0);
	function refreshCompo() { setRefresh(refresh+1); }

	// When a cell is clicked on the grid
	function emptyClicked(indexBlock, indexLine, indexDigit) {

		if (userGrid[indexBlock][indexLine][indexDigit] === 0) {

			// Change selected cell
			setSelectedCell([indexBlock, indexLine, indexDigit]);

			// Highlight cell clicked
			const tempColorsGrid = createEmptyArray();
			tempColorsGrid[indexBlock][indexLine][indexDigit] = "#FFC133";
			setColorsGrid(tempColorsGrid);

			// Show digits selector panel on the screen
			changeShowDigitsSelector(true);

			console.log(selectedCell);
		}

		else if (userGrid[indexBlock][indexLine][indexDigit] !== 0) {

			// Reset last highligted cell
			setColorsGrid(createEmptyArray());

			// Hide digits selector panel on the screen
			changeShowDigitsSelector(false);
		}
	}

	const [showDigitsSelector, setShowDigitsSelector] = useState(false);
	function changeShowDigitsSelector(newState) { setShowDigitsSelector(newState); }

	return (
		<div className="grid-box">

			<div className="grid-box__grid">
				
				{ userGrid.map((block, indexBlock) =>
					
					<div className="grid__big-square"
					key={`${block}-${indexBlock}`}>
					
						{block.map((line, indexLine) => 

							line.map((digit, indexDigit) =>

								<Digit
								key={`${digit}-${indexDigit}`}
								onPress={() => emptyClicked(indexBlock, indexLine, indexDigit)}
								digit={digit}
								bgColor={colorsGrid[indexBlock][indexLine][indexDigit]} />
							)
						)}

					</div>
				)}

			</div>

			{showDigitsSelector ?
				<DigitsSelector
				className="grid-box__digitsSelector"
				select={selectDigit} />
				:
				<div style={{height: "40px"}}></div>
			}

			<Digit digit={selectedDigit} />

		</div>
	);
}

export default Grid;
