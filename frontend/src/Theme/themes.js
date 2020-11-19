import merge from 'lodash/merge';

// secondary colors for gradients
const colors = {
	accent: 'hsl(220, 100%, 50%)',
	accent2: 'hsl(204, 100%, 50%)',

	error: 'hsl(0, 100%, 50%)',
	error2: 'hsl(0, 100%, 65%)',

	success: 'hsl(125, 95%, 35%)',
	success2: 'hsl(125, 95%, 50%)',

	warning: 'hsl(43, 100%, 45%)',
	warning2: 'hsl(43, 100%, 55%)',
};

const common = {
	colors: colors,

	topbar: {
		height: '60px',
	},

	sidebar: {
		width: '200px',
	},

	button: {
		shadow: 'hsla(0, 0%, 0%, 0.25) 0 0 2px',
	},

	box: {
		shadow: 'hsla(0, 0%, 0%, 0.25) 0 0 2px',
	},
};

const lightTheme = {
	background: 'hsl(240, 10%, 88%)',

	text: {
		primary: 'hsl(0, 0%, 0%)',
		secondary: 'hsl(240, 9%, 35%)',
	},

	sidebar: {
		linkActive: 'hsl(0, 0%, 95%)',
	},

	button: {
		text: 'hsl(0, 0%, 0%)',
		background: 'hsl(0, 0%, 90%)',
		backgroundHover: 'hsl(0, 0%, 80%)',
		backgroundActive: 'hsl(0, 0%, 70%)',
	},

	box: {
		background: 'hsl(0, 0%, 100%)',
		highlight: 'hsla(0, 0%, 100%, 0.5)',
	},

	scrollbar: {
		background: 'hsl(240, 10%, 70%)',
		handle: 'hsl(0, 0%, 50%)',
		handleHover: 'hsl(0, 0%, 35%)',
	},
};

const darkTheme = {
	background: 'hsl(0, 0%, 9%)',

	text: {
		primary: 'hsl(220, 50%, 95%)',
		secondary: 'hsl(0, 0%, 54%)',
	},

	sidebar: {
		linkActive: 'hsl(0, 0%, 13%)',
	},

	button: {
		text: 'hsl(220, 50%, 95%)',
		background: 'hsl(0, 0%, 30%)',
		backgroundHover: 'hsl(0, 0%, 35%)',
	},

	box: {
		background: 'hsl(0, 0%, 13%)',
		highlight: 'hsla(0, 0%, 34%, 38%)',
	},

	scrollbar: {
		background: 'hsl(0, 0%, 13%)',
		handle: 'hsl(0, 0%, 20%)',
		handleHover: 'hsl(0, 0%, 25%)',
	},
};

merge(lightTheme, common);
merge(darkTheme, common);

export default { dark: darkTheme, light: lightTheme };
