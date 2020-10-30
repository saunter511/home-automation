import ReactDOM from 'react-dom';
import { Suspense, lazy } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { ThemeContext, useTheme } from './Theme';

import SiteLoading from 'Theme/Components/SiteLoading';

if (module.hot) module.hot.accept();

const GlobalStyle = createGlobalStyle`
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

const App = lazy(() => import(/* webpackChunkName: 'app' */ './App'));

const Root = () => {
	const { theme, toggle, isDark } = useTheme();

	return (
		<ThemeContext.Provider value={{ theme, toggle, isDark }}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Suspense fallback={<SiteLoading />}>
					<App />
				</Suspense>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

// Render App with providers on #root
ReactDOM.render(<Root />, document.getElementById('root'));
