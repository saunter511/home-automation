import React from 'react';

const lightTheme = {
	text: '#000',
	textSecondary: '#696969',
	background: '#E5E5E5',
	mobile: '576px',
	colors: {
		accent: '#000',
		error: 'red',
	},
};

const darkTheme = {
	text: '#F5F5F5',
	textSecondary: '#D3D3D3',
	background: '#2F2F2F',
	mobile: '576px',
	colors: {
		accent: '#2F2F2F',
		error: 'red',
	},
};

// Create react context for theme info
export const ThemeContext = React.createContext([{}, () => {}, false]);

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
	const switchTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	let isDark = theme === 'dark';
	return [isDark ? darkTheme : lightTheme, switchTheme, isDark];
};
