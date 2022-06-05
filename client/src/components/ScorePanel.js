
import React, { useState, useEffect } from 'react';

import '../styles/components/ScorePanel.css';


const ScorePanel = (props) => {

	// Bg color quick switch to red when user make a mistake
	const [bgColor, setBgColor] = useState("white");
	const changeBgColor = () => {

		setBgColor("white");
	}

	// Call it (switch bg color to red) everytime the score change
	useEffect(() => {

		if (props.score !== 0) {

			setBgColor("red");
			setTimeout(changeBgColor, 1000);
		}
	}, [props.score]);

	return(

		<div
		className="score-panel"
		style={{backgroundColor:bgColor}} >

			<p className="score-panel__text"> {props.score} errors ! </p>

		</div>
	)
} 

export default ScorePanel;
