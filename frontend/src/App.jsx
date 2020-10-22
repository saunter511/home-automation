import styled from 'styled-components';
import React, { useState } from 'react';
import Menu from './pages/Menu';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

import { HashRouter, Route, Routes } from 'react-router-dom';

const AppWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

const ContentWrapper = styled.div`
	display: grid;
	text-align: center;
	grid-template-columns: minmax(80px, auto) minmax(50vw, auto);
`;

const DashboardWrapper = styled.div`
	margin: 15px;
`;

const App = () => {
	const [hamburger, setHamburger] = useState(false);

	return (
		<AppWrapper>
			<ContentWrapper>
				<Menu open={hamburger} setHamburger={() => setHamburger(!hamburger)} />
				<DashboardWrapper>
					<HashRouter>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/profile" element={<Profile />} />
						</Routes>
					</HashRouter>
				</DashboardWrapper>
			</ContentWrapper>
		</AppWrapper>
	);
};

export default App;
