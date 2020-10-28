import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import Loading from 'Theme/Components/Loading';

const Dashboard = React.lazy(() => import(/* webpackChunkName: 'dashboard' */ 'Pages/Dashboard'));
const Settings = React.lazy(() => import(/* webpackChunkName: 'settings' */ 'Pages/Settings'));
const Profile = React.lazy(() => import(/* webpackChunkName: 'profile' */ 'Pages/Profile'));

const PageWrapper = styled.div`
	display: flex;

	width: 100%;
	height: 100%;

	padding-top: ${(p) => p.theme.topbar.height};

	@media screen and (max-width: 800px) {
		padding-left: 0;
	}

	@media screen and (min-width: 800px) {
		padding-left: ${(p) => p.theme.sidebar.desktop.width};
	}
`;

const Routing = () => {
	return (
		<PageWrapper>
			<React.Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</React.Suspense>
		</PageWrapper>
	);
};

export default Routing;
