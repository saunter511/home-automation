import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Loading } from 'Theme/Components';

const Lamps = lazy(() => import(/* webpackChunkName: 'lamps' */ 'Pages/Lamps/'));
const Dashboard = lazy(() => import(/* webpackChunkName: 'dashboard' */ 'Pages/Dashboard'));
const Profile = lazy(() => import(/* webpackChunkName: 'profile' */ 'Pages/Profile'));
const NotFound = lazy(() => import(/* webpackChunkName: 'profile' */ 'Pages/NotFound'));

const PageWrapper = styled.div`
	grid-area: content;
	display: flex;

	overflow-y: auto;

	width: 100%;
	height: 100%;

	padding: 0 20px;
`;

const Routing = () => {
	return (
		<PageWrapper>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/lamps" element={<Lamps />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</PageWrapper>
	);
};

export default Routing;
