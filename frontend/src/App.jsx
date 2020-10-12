import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'Root/theme';
import { FaReact } from 'react-icons/fa';

const AppWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ContentWrapper = styled.div`
	width: 95vw;
	max-width: 1000px;
	text-align: center;
`;

const Logo = styled.div`
	font-size: 4em;

	& svg {
		font-size: 6em;
	}
`;

const App = () => {
	const [toggleTheme, isDark] = React.useContext(ThemeContext);

	return (
		<AppWrapper>
			<ContentWrapper>
				<Logo>
					<FaReact />
					<br />
					React template
				</Logo>
				<button onClick={() => toggleTheme()}>
					Switch to {isDark ? 'light' : 'dark'} theme
				</button>
			</ContentWrapper>
		</AppWrapper>
	);
};

export default App;
