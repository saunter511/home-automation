import styled from 'styled-components';
import { useState } from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client';

import Sidebar, { SidebarContext } from 'Components/Sidebar';
import Topbar from 'Components/Topbar';
import Routing from 'Components/Routing';

const Overlay = styled.div`
	@media screen and (max-width: 800px) {
		background: rgba(0, 0, 0, 0.5);
		z-index: 50;

		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		&:hover {
			cursor: pointer;
		}
	}
`;

const App = () => {
	const [sidebar, setSidebar] = useState(false);

	return (
		<ApolloProvider client={client}>
			<Router>
				<SidebarContext.Provider value={[sidebar, setSidebar]}>
					<Topbar />
					<Sidebar />
					<Routing />
					{sidebar ? <Overlay onClick={() => setSidebar(false)} /> : null}
				</SidebarContext.Provider>
			</Router>
		</ApolloProvider>
	);
};

export default App;
