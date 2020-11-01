import { gql, useQuery } from '@apollo/client';
import { readableColor } from 'polished';
import { useContext } from 'react';
import { FaUserAlt } from '@meronex/icons/fa';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Hamburger from 'Theme/Components/Hamburger';
import { SidebarContext } from './Sidebar';

const TopbarContainer = styled.div`
	grid-area: topbar;
	z-index: 100;

	display: flex;
	align-items: center;

	padding: 0 5px;

	width: 100%;
	height: ${(p) => p.theme.topbar.height};
`;

const SidebarHamburger = styled(Hamburger)`
	margin-right: 10px;

	& span {
		background: ${(p) => (p.state ? p.theme.colors.error : p.theme.colors.accent2)};
	}

	@media screen and (min-width: 900px) {
		display: none;
	}
`;

const UserPanel = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-left: auto;
	padding: 5px 10px;

	text-decoration: none;

	color: ${(p) => readableColor(p.theme.sidebar.linkActive)};
	border-radius: 5px;

	& span {
		margin: 0 10px;
		font-size: 15px;

		color: ${(p) => p.theme.text.secondary};
	}

	& svg {
		font-size: 35px;
		border-radius: 50%;
		padding: 2px;

		color: ${(p) => p.theme.text.primary};

		border: 2px solid ${(p) => p.theme.colors.accent};
	}

	&:hover {
		cursor: pointer;
	}
`;

const Logo = styled.div`
	display: flex;
	align-items: center;

	user-select: none;
	padding: 5px;

	max-height: 30px;

	& svg {
		width: 35px;
		height: 30px;
		/* font-size: 35px; */

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
		/* margin-bottom: -1.8px; */

		font-size: 30px;
		font-weight: 900;
	}
`;

const USER_QUERY = gql`
	query getCurrentUser {
		currentUser {
			id
			shortName
		}
	}
`;

const Topbar = () => {
	const [open, setOpen] = useContext(SidebarContext);
	const { data, loading, error } = useQuery(USER_QUERY);

	return (
		<TopbarContainer>
			<SidebarHamburger state={open} onClick={() => setOpen(!open)}>
				<span />
				<span />
				<span />
			</SidebarHamburger>

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
				<div>Home</div>
			</Logo>

			<UserPanel to="/profile">
				<span>{!loading && !error && data.currentUser.shortName}</span>
				<FaUserAlt />
			</UserPanel>
		</TopbarContainer>
	);
};

export default Topbar;
