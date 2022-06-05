
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/Header.css';


const Header = () => {

	return (

		<div className="header">
			
			<Link to="/" style={{textDecoration: "none"}}>
				<h1 className="header__title">Soduko</h1>
			</Link>

		</div>
	)
}

export default Header;

