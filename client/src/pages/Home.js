
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/Home.css';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';


const Home = () => {

	return (

		<>
			<Header />

			<div className="home">
				
				<Link className="home__play-button" to="/game">Play</Link>

			</div>
			
			<Footer />
		</>
	)
}

export default Home;
