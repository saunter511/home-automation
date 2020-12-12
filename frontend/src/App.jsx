import styled from 'styled-components';
import { useState } from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client';

import Sidebar, { SidebarContext } from 'Components/Sidebar';
import Topbar from 'Components/Topbar';
import Routing from 'Components/Routing';
import Chat from 'Components/Chat/Chat';

const Layout = styled.div`
	display: grid;

	grid-template-columns: ${(p) => p.theme.sidebar.width} 1fr;
	grid-template-rows: ${(p) => p.theme.topbar.height} 1fr;

	grid-gap: 10px;

	@media screen and (max-width: 900px) {
		grid-template-areas:
			'topbar topbar'
			'content content';
	}

	@media screen and (min-width: 900px) {
		grid-template-areas:
			'topbar topbar'
			'sidebar content';
	}

	height: 100%;
	width: 100%;
`;

const App = () => {
	const [sidebar, setSidebar] = useState(false);

	return (
		<ApolloProvider client={client}>
			<Router>
				<SidebarContext.Provider value={[sidebar, setSidebar]}>
					<Layout sidebarOpen={sidebar}>
						<Topbar />
						<Sidebar />
						<Routing />
					</Layout>
				</SidebarContext.Provider>
			</Router>

			<Chat />
		</ApolloProvider>
	);
};

export default App;
