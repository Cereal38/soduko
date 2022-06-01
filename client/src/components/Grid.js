
import React, { useState } from 'react';

import '../styles/components/Grid.css';

import Digit from './Digit.js';
import DigitsSelector from './DigitsSelector.js';
import ScorePanel from './ScorePanel.js';


const grid = [
	[[2, 3, 4], [1, 5, 6], [9, 8, 7]], 
	[[8, 1, 9], [7, 4, 2], [3, 6, 5]], 
	[[5, 7, 6], [9, 8, 3], [2, 1, 4]], 
	[[4, 7, 5], [6, 1, 8], [3, 2, 9]], 
	[[9, 3, 8], [2, 7, 4], [1, 5, 6]], 
	[[1, 6, 2], [3, 9, 5], [7, 4, 8]], 
	[[8, 4, 1], [5, 9, 2], [7, 6, 3]], 
	[[5, 9, 3], [6, 8, 7], [4, 2, 1]], 
	[[6, 2, 7], [4, 3, 1], [8, 5, 0]],
]

const solution = [
	[[2, 3, 4], [1, 5, 6], [9, 8, 7]], 
	[[8, 1, 9], [7, 4, 2], [3, 6, 5]], 
	[[5, 7, 6], [9, 8, 3], [2, 1, 4]], 
	[[4, 7, 5], [6, 1, 8], [3, 2, 9]], 
	[[9, 3, 8], [2, 7, 4], [1, 5, 6]], 
	[[1, 6, 2], [3, 9, 5], [7, 4, 8]], 
	[[8, 4, 1], [5, 9, 2], [7, 6, 3]], 
	[[5, 9, 3], [6, 8, 7], [4, 2, 1]], 
	[[6, 2, 7], [4, 3, 1], [8, 5, 9]],
]

// Create an array full of 'content' given in arg (Same format as grids)
function createArray(content) {

	let array = [];
	for (let i = 0; i < 9; i++) {

		array.push([]);

		for (let j = 0; j < 3; j++) {

			array[i].push([]);

			for (let k = 0; k < 3; k++) { array[i][j].push(content); }
		}
	}

	return array;
}

const Grid = () => {
	

	const [userGrid, setUserGrid] = useState(grid);
	const [colorsGrid, setColorsGrid] = useState(createArray(""));
	const [textColorGrid, setTextColorGrid] = useState(createArray("black"))
	const [selectedCell, setSelectedCell] = useState([0, 0, 0])
	const [showDigitsSelector, setShowDigitsSelector] = useState(false);
	const [scoreCounter, setScoreCounter] = useState(0);

	// Get digit selected in digitsSelector and add it in the grid
	const selectDigit = (digit) => {
		
		// Hide DigitsSelector when a digit is selected
		setShowDigitsSelector(false);

		// Get index of the selected cell
		let [ indexBlock, indexLine, indexDigit ] = selectedCell;

		// Check if the selected digit is the right one
		if (parseInt(digit) === solution[indexBlock][indexLine][indexDigit]) {
		
			// Change color to add a blue digit in the grid
			let tempTextColorGrid = textColorGrid;
			tempTextColorGrid[indexBlock][indexLine][indexDigit] = "blue";
			setTextColorGrid(tempTextColorGrid);

			// Change the userGrid with new digit
			let tempUserGrid = userGrid;
			tempUserGrid[indexBlock][indexLine][indexDigit] = parseInt(digit);
			setUserGrid(tempUserGrid); 

		} else { 

			// Add 1 to error counter
			setScoreCounter(scoreCounter + 1);
		}

		// Check if the grid is full if yes end game
		if (JSON.stringify(userGrid) === JSON.stringify(solution)) {

			alert("Congratulation ! Completed with " + scoreCounter + " errors !")
		}

	}

	// Allow to refresh components (MAYBE DELETE)
	const [refresh, setRefresh] = useState(0);
	function refreshCompo() { setRefresh(refresh+1); }

	// When a cell is clicked on the grid
	function emptyClicked(indexBlock, indexLine, indexDigit) {

		if (userGrid[indexBlock][indexLine][indexDigit] === 0) {

			// Change selected cell
			setSelectedCell([indexBlock, indexLine, indexDigit]);

			// Highlight cell clicked
			const tempColorsGrid = createArray("");
			tempColorsGrid[indexBlock][indexLine][indexDigit] = "#FFC133";
			setColorsGrid(tempColorsGrid);

			// Show digits selector panel on the screen
			setShowDigitsSelector(true);
		}

		else if (userGrid[indexBlock][indexLine][indexDigit] !== 0) {

			// Reset last highligted cell
			setColorsGrid(createArray(""));

			// Hide digits selector panel on the screen
			setShowDigitsSelector(false);
		}
	}
	
	return (
		<div className="grid-box">

			<ScorePanel score={scoreCounter} />
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
								bgColor={colorsGrid[indexBlock][indexLine][indexDigit]}
								textColor={textColorGrid[indexBlock][indexLine][indexDigit]} />
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

		</div>
	);
}

export default Grid;
