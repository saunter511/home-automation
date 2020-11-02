import styled from 'styled-components';

const Loading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid ${(p) => p.theme.text.secondary};
	border-top: 1px solid ${(p) => p.theme.text.primary};
	border-radius: 50%;
	width: 16px;
	height: 16px;
	animation: spin 1s ease-in-out infinite;
	z-index: 1;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loading;
