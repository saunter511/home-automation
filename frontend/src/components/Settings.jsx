import styled from 'styled-components';
import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import { ThemeContext } from 'Root/theme';

const SettingsStyle = styled.div`
	text-align: left;
	hr {
		border: solid ${(p) => p.theme.textSecondary} 2px;
	}
`;

const Settings = () => {
	const [toggleTheme, isDark] = React.useContext(ThemeContext);
	return (
		<SettingsStyle>
			<h1>Settings</h1>
			<hr></hr>
			<h2>Visual</h2>
			<p>Theme: </p>
			<Button onClick={() => toggleTheme()}>
				Switch to {isDark ? 'light' : 'dark'} theme
			</Button>
		</SettingsStyle>
	);
};

Settings.propTypes = {
	toggleTheme: PropTypes.func,
	isDark: PropTypes.bool,
};

export default Settings;
