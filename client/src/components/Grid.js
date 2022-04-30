
import React, { useState, } from 'react';
import '../styles/components/Grid.css';

const grid = [
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
]

const Grid = () => {
	
	const [userGrid, setUserGrid] = useState(grid);
	
	return (
		
		<div className="grid">
			
			{ userGrid.map((block) => 
				
				block.map((line) => 

					line.map((digit) => <div className="grid__digit">{digit}</div>)
				)
			)}

		</div>
	);
}

export default Grid;

