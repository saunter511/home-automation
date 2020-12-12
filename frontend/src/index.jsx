import ReactDOM from 'react-dom';
import { Suspense, lazy } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ThemeContext, useTheme } from './Theme';
import { parseToRgb, toColorString } from 'polished';

import SiteLoading from 'Theme/Components/SiteLoading';

if (module.hot) module.hot.accept();

// Register service worker
if ('serviceWorker' in navigator && process.env.NODE_ENV != 'development') {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(() => {
				console.log('ServiceWorker registered!');
			})
			.catch((err) => {
				console.log(`Failed to register ServiceWorker! ${err.message}`);
			});
	});
}

const GlobalStyle = createGlobalStyle`
	html, body, #root {
		height: 100%;
		max-width: 100vw;
		margin: 0;
		box-sizing: border-box;
		font-family: Roboto, sans-serif;
	}

	*, *:before, &:after {
		box-sizing: inherit;

	}

    body {
		background: ${(p) => p.theme.background};
		color: ${(p) => p.theme.text.primary};
		overflow: none;
	}

	::-webkit-scrollbar {
		width: 5px;
	}


	::-webkit-scrollbar-track {
		background: ${(p) => p.theme.scrollbar.background};
	}

	::-webkit-scrollbar-thumb {
		background: ${(p) => p.theme.scrollbar.handle};
	}

	::-webkit-scrollbar-thumb:hover {
		background: ${(p) => p.theme.scrollbar.handleHover};
	}
`;

const App = lazy(() => import(/* webpackChunkName: 'app' */ './App'));

const Root = () => {
	const { theme, toggle, isDark } = useTheme();

	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', toColorString(parseToRgb(theme.background)));

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
