import React from 'react';
import themes from './themes';

// Create react context for theme info
export const ThemeContext = React.createContext({ theme: {}, toggle: () => {}, isDark: false });

// Define a hook to control theme from any component
export const useTheme = () => {
	let stored = localStorage.getItem('theme');

	// If no theme variant is stored in local storage, check if client wants dark theme and set accordingly
	if (!stored) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			stored = 'dark';
		} else {
			stored = 'light';
		}
		localStorage.setItem('theme', stored);
	}

	// Create a state variable holding theme variant
	const [theme, setTheme] = React.useState(stored);

	// Theme switcher function
	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	let isDark = theme === 'dark';

	return { theme: isDark ? themes.dark : themes.light, toggle: toggleTheme, isDark: isDark };
};
