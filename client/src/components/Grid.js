
import React, { useState, } from 'react';
import '../styles/components/Grid.css';
import Digit from './Digit.js';
import DigitsSelector from './DigitsSelector.js';


const grid = [
	[["1", "2", "3"], ["4", "5","6"], ["", "8", "9"]],
	[["1", "", ""], ["4", "5","6"], ["7", "", "9"]],
	[["1", "2", "3"], ["4", "","6"], ["7", "8", "9"]],
	[["", "", "3"], ["4", "5","6"], ["7", "", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", ""], ["", "","6"], ["7", "8", "9"]],
	[["", "2", "3"], ["4", "5",""], ["7", "8", "9"]],
	[["1", "", "3"], ["", "","6"], ["7", "8", "9"]],
	[["1", "", ""], ["", "5","6"], ["7", "8", "9"]],
]

const colors = [
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
	[["blue", "blue", "blue"], ["blue", "blue","blue"], ["blue", "blue", "blue"]],
]

const Grid = () => {
	
	const [userGrid, setUserGrid] = useState(grid);
	const [colorGrid, setColorGrid] = useState(colors);

	function digitClicked(block, indexBlock, indexLine, indexDigit) {
		
		if (userGrid[indexBlock][indexLine][indexDigit] == "") {

			let tempColorGrid = colorGrid;
			tempColorGrid[indexBlock][indexLine][indexDigit] = "red";
			setColorGrid(tempColorGrid);

			console.log(colorGrid);
		}
	}
	
	return (
		<>	
		<div className="grid">
			
			{ userGrid.map((block, indexBlock) =>
				
				<div className="grid__big-square"
				key={`${block}-${indexBlock}`}>
				
					{block.map((line, indexLine) => 

						line.map((digit, indexDigit) =>
							
							<div 
							style={{backgroundColor: colorGrid[indexBlock][indexLine][indexDigit]}}
							key={`${digit}-${indexDigit}`}
							onClick={() => digitClicked(block, indexBlock, indexLine, indexDigit)}>

								<Digit digit={digit} />
							</div>)
					)}

				</div>
			)}

		</div>
		<DigitsSelector />
		</>
	);
}

export default Grid;

