import React from 'react';
import styled from 'styled-components';
import Button from 'Components/Button';
import { ImGithub } from 'react-icons/im';
import {AiFillBulb} from 'react-icons/ai';
import { ThemeContext } from 'Root/theme';
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



const App = () => {
	const [toggleTheme] = React.useContext(ThemeContext);

	return (
		<AppWrapper>
			<ContentWrapper>
			 
			<Button href="https://github.com/owocowe-piatki/home-automation"> 
			<ImGithub/> home-automation
			</Button> 

			<Button onClick={() => toggleTheme()}>
					<AiFillBulb/> Switch  theme
			</Button>
			
			</ContentWrapper>
		</AppWrapper>
	);
};

export default App;
