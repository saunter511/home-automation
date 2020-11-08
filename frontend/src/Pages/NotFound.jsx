import styled from 'styled-components';

const NotFoundContainer = styled.div`
	position: relative;
	bottom: 50px;

	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`;

const NotFound = () => (
	<NotFoundContainer>
		<h1>Not Found</h1>
	</NotFoundContainer>
);

export default NotFound;
