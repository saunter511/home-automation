import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;

	color: ${(p) => p.theme.button.text};
	text-decoration: none;

	background: ${(p) => p.theme.button.background};

	&:hover {
		cursor: pointer;
		background: ${(p) => p.theme.button.backgroundHover};
	}

	&:focus {
		background: ${(p) => p.theme.button.backgroundHover};
		outline: none;
		outline-offset: 0;
	}

	&:active {
		background: ${(p) => p.theme.button.backgroundActive};
	}
`;

const Button = (props) => {
	return (
		<ButtonContainer tabIndex="0" {...props}>
			{props.children}
		</ButtonContainer>
	);
};

Button.propTypes = {
	children: PropTypes.array,
};

export const ButtonRow = styled.div`
	display: flex;
	margin-top: 10px;

	& ${ButtonContainer} {
		margin-right: 5px;
	}
`;

export default Button;
