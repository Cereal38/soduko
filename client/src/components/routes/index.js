
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../../pages/Home.js';

const index = () => {

	return(

		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default index;
