
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/Home.css';


const Home = () => {

	return (

		<div className="home">
			
			<Link className="home__play-button" to="/game">Play</Link>

		</div>
	)
}

export default Home;
