import styled from 'styled-components';

const PageContainer = styled.div`
	width: 100%;
	height: 100%;

	@media screen and (min-width: 800px) {
		padding: 10px;
	}

	@media screen and (max-width: 800px) {
		padding: 5px;
	}
`;

export default PageContainer;
