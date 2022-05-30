
import React from 'react';
import '../styles/components/Digit.css';


const Digit = (props) => {

	return (

		<div
		className="digit"
		onClick={props.onPress}
		style={{backgroundColor: props.bgColor}}
		>
			{props.digit == 0 ? "" : props.digit}
		</div>
	);
}


export default Digit;
