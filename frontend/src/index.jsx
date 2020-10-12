import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ThemeContext, useTheme } from './theme';

import App from './App';

// CSS Reset + border-box
const GlobalStyle = createGlobalStyle`
	html, body, #root {
		height: 100%;
		max-width: 100vw;
		margin: 0;
		box-sizing: border-box;
	}

	*, *:before, &:after {
		box-sizing: inherit;
	}

    body {
		background: ${(p) => p.theme.background};
		color: ${(p) => p.theme.text};
	}
`;

const Root = () => {
	const [theme, toggleTheme, isDark] = useTheme();

	return (
		<ThemeContext.Provider value={[toggleTheme, isDark]}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

// Render App with providers on #root
ReactDOM.render(
	<Root />,

	document.getElementById('root')
);
