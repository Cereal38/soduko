
import React from 'react';

import '../styles/pages/Game.css';

import Grid from '../components/Grid.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const Game = () => {

	return (

		<>	
			<Header />

			<div className="game-page">
				<Grid />
			</div>

			<Footer />
		</>	
	);
}

export default Game;
