import styled from 'styled-components';

const Button = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;

	color: ${(p) => p.theme.text.primary};
	background: ${(p) => p.theme.buttonBg};
	border-radius: 5px;

	box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 4px;

	padding: 4px;
	text-decoration: none;

	&:hover {
		cursor: pointer;
	}
`;

export default Button;
