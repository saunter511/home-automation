import styled from 'styled-components';
import React from 'react';

import { ThemeContext } from 'Theme';
import PageHeader from 'Theme/Components/PageHeader';
import Button from 'Theme/Components/Button';
import PageContainer from 'Theme/Components/PageContainer';
import Box from 'Theme/Components/Box';

const SettingsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));

	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;

const ThemeSwitcher = styled(Button)`
	width: 200px;
`;

const CategoryHeader = styled.h2`
	margin: 5px 0;
	color: ${(p) => p.theme.text.secondary};
`;

const Settings = () => {
	const { toggle, isDark } = React.useContext(ThemeContext);

	return (
		<PageContainer>
			<PageHeader>Settings</PageHeader>

			<SettingsGrid>
				<Box>
					<CategoryHeader>Visual</CategoryHeader>
					<ThemeSwitcher onClick={() => toggle()}>
						Switch to {isDark ? 'light' : 'dark'} theme
					</ThemeSwitcher>
				</Box>

				<Box></Box>
				<Box></Box>
				<Box></Box>
			</SettingsGrid>
		</PageContainer>
	);
};

export default Settings;
