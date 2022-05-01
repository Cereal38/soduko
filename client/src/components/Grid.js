
import React, { useState, } from 'react';
import '../styles/components/Grid.css';
import Digit from './Digit.js';
import DigitsSelector from './DigitsSelector.js';


const grid = [
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
	[["1", "2", "3"], ["4", "5","6"], ["7", "8", "9"]],
]


const Grid = () => {
	
	const [userGrid, setUserGrid] = useState(grid);

	function digitClicked(digit) {
		
		console.log(digit);
	}
	
	return (
		<>	
		<div className="grid">
			
			{ userGrid.map((block, index) =>
				
				<div className="grid__big-square"
				key={`${block}-${index}`}>
				
					{block.map((line) => 

						line.map((digit, index) =>
							
							<div 
							key={`${digit}-${index}`}
							onClick={() => digitClicked(digit)}>

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

