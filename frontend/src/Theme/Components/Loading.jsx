import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loading = () => {
	return <LoadingContainer>Loading...</LoadingContainer>;
};

export default Loading;
