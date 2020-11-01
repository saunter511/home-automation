import styled from 'styled-components';

import PageContainer from 'Theme/Components/PageContainer';
import Box from 'Theme/Components/Box';

const DashGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
	grid-gap: 15px;

	@media screen and (max-width: 1300px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const Dashboard = () => {
	return (
		<PageContainer>
			<DashGrid>
				<Box />
				<Box variant="error" />
				<Box variant="success" />
				<Box variant="warning" />
			</DashGrid>
		</PageContainer>
	);
};

export default Dashboard;
