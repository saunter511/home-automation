import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { PageLoading, Error, Button } from 'Theme/Components';

const Lamps = lazy(() => import(/* webpackChunkName: 'lamps' */ 'Pages/Lamps/'));
const TempSensors = lazy(() => import(/* webpackChunkName: 'temp-sensors'*/ 'Pages/TempSensors/'));
const Dashboard = lazy(() => import(/* webpackChunkName: 'dashboard' */ 'Pages/Dashboard'));
const Profile = lazy(() => import(/* webpackChunkName: 'profile' */ 'Pages/Profile'));
const Rollers = lazy(() => import(/* webpackChunkName: 'rollers' */ 'Pages/Rollers'));
const Sockets = lazy(() => import(/* webpackChunkName: 'sockets' */ 'Pages/Sockets'));
const DoorsAndWindows = lazy(() =>
	import(/* webpackChunkName: 'doorsandwindows' */ 'Pages/DoorsAndWindows')
);
const NotFound = lazy(() => import(/* webpackChunkName: 'notfound' */ 'Pages/NotFound'));

const PageWrapper = styled.div`
	grid-area: content;
	display: flex;

	overflow-y: auto;

	width: 100%;
	height: 100%;

	padding: 0 20px;
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<Error message={error ? error.message : ''}>
			<Button onClick={resetErrorBoundary}>Go back</Button>
		</Error>
	);
};

ErrorFallback.propTypes = {
	error: PropTypes.object,
	resetErrorBoundary: PropTypes.func,
};

const Routing = () => {
	const navigate = useNavigate();

	return (
		<PageWrapper>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					navigate(-1);
				}}
			>
				<Suspense fallback={<PageLoading />}>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/lamps" element={<Lamps />} />
						<Route path="/temp-sensors" element={<TempSensors />} />
						<Route path="/rollers" element={<Rollers />} />
						<Route path="/sockets" element={<Sockets />} />
						<Route path="/doorsandwindows" element={<DoorsAndWindows />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</PageWrapper>
	);
};

export default Routing;
