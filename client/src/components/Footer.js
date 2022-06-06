
import React from 'react';

import '../styles/components/Footer.css';


const Footer = () => {

	return(

		<div className="footer">
			
			<div className="footer__separator"></div>

			<div className="footer__content">

				<p className="content__credits">Credits : Cereal • Xenepix</p>
				
				<a 
					className="content__github" 
					href="https://github.com/Cereal38/soduko"
					target="_blank"
					rel="noreferrer">
					
					Github repository
				
				</a>

			</div>

		</div>
	)
}

export default Footer;
