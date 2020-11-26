import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	& div:first-child {
		font-size: 3.5rem;
		font-weight: 900;
		color: ${(p) => p.theme.colors.error};
		user-select: none;
	}

	& div:last-child {
		margin-top: 10px;
		font-size: 90%;
		word-wrap: break-word;
	}
`;

const Error = ({ message, children }) => {
	return (
		<ErrorWrapper>
			<div>Error</div>
			<div>{message}</div>

			{children && <div>{children}</div>}
		</ErrorWrapper>
	);
};

Error.propTypes = {
	message: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Error;
