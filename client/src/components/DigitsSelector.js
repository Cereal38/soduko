
import React, { useState } from 'react';
import '../styles/components/DigitsSelector.css';


const DigitsSelector = () => {
	
	const [digits, _] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9"])

	return (

		<div className="digits-selector">

			{digits.map((digit, index) =>
				
				<div className="digits-selector__digit"
				key={`${digit}-${index}`}>
					
					{digit}
				</div>
			)}
		</div>
	);
}


export default DigitsSelector;
