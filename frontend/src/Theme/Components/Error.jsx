import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
	color: ${(p) => p.theme.text.error};
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Error = (message) => {
	return <ErrorContainer>Error {message}</ErrorContainer>;
};

export default Error;
