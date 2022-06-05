
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../../pages/Home.js';
import Game from '../../pages/Game.js';
import Victory from '../../pages/Victory.js';

const index = () => {

	return(

		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/game' element={<Game />} />
				<Route path="/victory" element={<Victory />} />
			</Routes>
		</Router>
	)
}

export default index;
