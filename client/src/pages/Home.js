
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/Home.css';

import Header from '../components/Header.js';


const Home = () => {

	return (

		<>
			<Header />

			<div className="home">
				
				<Link className="home__play-button" to="/game">Play</Link>

			</div>
		</>
	)
}

export default Home;
