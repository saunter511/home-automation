import styled from 'styled-components';

const Box = styled.div`
	background: ${(p) => p.theme.box.background};
	box-shadow: ${(p) => p.theme.box.shadow};
	padding: 10px;
	border-radius: 5px;
	min-height: 100px;

	margin: 5px;
`;

export default Box;
