
import React from 'react';
import '../styles/components/Digit.css';


const Digit = (props) => {

	return (

		<div className="digit"
		>
			{props.digit}
		</div>
	);
}


export default Digit;
