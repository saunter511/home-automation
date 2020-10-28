import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeContext, useTheme } from './Theme';
import { createGlobalStyle } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './client';

import App from './App';

export const GlobalStyle = createGlobalStyle`
	html, body, #root {
		height: 100%;
		max-width: 100vw;
		margin: 0;
		box-sizing: border-box;
		font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif;
	}

	*, *:before, &:after {
		box-sizing: inherit;
	}

    body {
		background: ${(p) => p.theme.background};
		color: ${(p) => p.theme.text.primary};
	}
`;

const Root = () => {
	const { theme, toggle, isDark } = useTheme();

	return (
		<ApolloProvider client={client}>
			<ThemeContext.Provider value={{ theme, toggle, isDark }}>
				<ThemeProvider theme={theme}>
					<Router>
						<GlobalStyle />
						<App />
					</Router>
				</ThemeProvider>
			</ThemeContext.Provider>
		</ApolloProvider>
	);
};

// Render App with providers on #root
ReactDOM.render(<Root />, document.getElementById('root'));
