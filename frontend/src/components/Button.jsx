import styled from 'styled-components';

const Button = styled.a`
	color: ${(p) => p.theme.text};

	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	padding: 4px;
	margin: 0.5rem 1rem;
	width: 11rem;
	background: transparent;
	border: 2px solid ${(p) => p.theme.text};
	text-decoration: none;
	font-family: sans-serif;
	font-size: large;
`;

export default Button;
