import styled from 'styled-components';
import React from 'react';
import Sidebar, { SidebarContext } from 'Components/Sidebar';
import Routing from 'Components/Routing';
import Topbar from 'Components/Topbar';

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
	const [sidebar, setSidebar] = React.useState(false);

	return (
		<SidebarContext.Provider value={[sidebar, setSidebar]}>
			<Topbar />
			<Sidebar />
			<Routing />
			{sidebar ? <Overlay onClick={() => setSidebar(false)} /> : null}
		</SidebarContext.Provider>
	);
};

export default App;
