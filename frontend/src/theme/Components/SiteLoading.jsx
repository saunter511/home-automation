import styled from 'styled-components';

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loading = styled.div`
	position: relative;
	width: 200px;
	height: 200px;
`;

const Spinner = styled.div`
	position: absolute;

	display: flex;
	align-items: center;
	background: transparent;
	border: 7px solid ${(p) => p.theme.loading.secondary};
	border-top: 7px solid ${(p) => p.theme.loading.primary};
	border-radius: 50%;
	width: 200px;
	height: 200px;
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

const Logo = styled.div`
	position: absolute;
	width: 200px;
	height: 200px;

	display: flex;
	align-items: center;
	justify-content: center;

	user-select: none;
	padding: 5px;

	& svg {
		width: 80px;
		height: 80px;

		& .color1 {
			stop-color: ${(p) => p.theme.colors.accent};
		}

		& .color2 {
			stop-color: ${(p) => p.theme.colors.accent2};
		}
	}

	& div {
		height: 30px;
		margin: 0 5px;
		margin-bottom: 7px;

		font-size: 30px;
		font-weight: 900;
	}
`;

const SiteLoading = () => {
	return (
		<LoadingContainer>
			<Loading>
				<Spinner />
				<Logo>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 576 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<radialGradient
							id="gradient"
							gradientTransform="rotate(-40)"
							cx="0.3"
							cy="0.8"
							r="0.8"
						>
							<stop className="color1" offset="0%" />
							<stop className="color2" offset="100%" />
						</radialGradient>
						<path
							fill="url(#gradient)"
							d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
						></path>
					</svg>
				</Logo>
			</Loading>
		</LoadingContainer>
	);
};

export default SiteLoading;
