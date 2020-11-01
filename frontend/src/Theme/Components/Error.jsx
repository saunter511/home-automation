import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorContainer = styled.div`
	color: ${(p) => p.theme.colors.error};
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Error = ({ message }) => {
	return <ErrorContainer>Error {message}</ErrorContainer>;
};

Error.propTypes = {
	message: PropTypes.string,
};

export default Error;
