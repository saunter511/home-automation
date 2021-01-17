import styled from 'styled-components';

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;
const Loading = styled.div`
	display: flex;
	align-items: center;
	background: transparent;
	border: 7px solid ${(p) => p.theme.loading.secondary};
	border-top: 7px solid ${(p) => p.theme.loading.primary};
	border-radius: 50%;
	width: 150px;
	height: 150px;
	animation: spin 1.8s infinite linear;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const SiteLoading = () => {
	return (
		<LoadingContainer>
			<Loading />
		</LoadingContainer>
	);
};

export default SiteLoading;
