import { gql, useQuery } from '@apollo/client';
import { useContext, useState, useRef, useEffect } from 'react';
import { FaUserAlt } from '@meronex/icons/fa';
import { FiUser, FiTrello, FiLogOut } from '@meronex/icons/fi';
import { RiSunLine, RiMoonLine } from '@meronex/icons/ri';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from 'Theme';
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

const DropdownContainer = styled.div`
	width: ${(p) => p.theme.sidebar.width};
	margin-left: auto;
`;

const UserPanel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
	padding: 10px 10px;
	text-decoration: none;

	color: ${(p) => p.theme.text.secondary};

	& span {
		margin: 0 10px;
		font-size: 15px;
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

const Hamburger = styled.div`
	@media screen and (min-width: 900px) {
		display: none;
	}

	width: 32px;
	height: 20px;
	z-index: 10;
	margin-right: 10px;

	&:hover {
		cursor: pointer;
	}

	& span {
		display: block;
		position: relative;
		border-radius: 3px;
		width: 26px;
		height: 4px;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

		margin: 0 auto;

		background: ${(p) => (p.state ? p.theme.colors.error : p.theme.colors.accent2)};
	}

	& span:nth-child(1) {
		transform: ${(p) => (p.state ? 'translateY(8px) rotate(45deg)' : '')};
	}

	& span:nth-child(2) {
		margin-top: 4px;
		margin-bottom: 4px;
		opacity: ${(p) => (p.state ? 0 : 1)};
		transition: opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
	}

	& span:nth-child(3) {
		transform: ${(p) => (p.state ? 'translateY(-8px) rotate(-45deg)' : '')};
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

const Menu = styled.div`
	position: fixed;
	top: ${(p) => p.theme.topbar.height - 5};
	width: ${(p) => p.theme.sidebar.width};

	transition: opacity 0.2s, transform 0.4s ease-in, visibility 0.4s;

	opacity: ${(p) => (p.active ? '1' : '0')};
	visibility: ${(p) => (p.active ? 'visible' : 'hidden')};

	@media screen and (max-width: 900px) {
		width: 100%;
		left: 0;
		right: 0;
	}

	& a {
		color: ${(p) => p.theme.text.primary};
		text-decoration: none;
	}
`;

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-decoration: none;
	padding: 10px 20px;
	background: ${(p) => p.theme.box.background};
	box-shadow: ${(p) => p.theme.box.shadow};
	border-left: 3px solid ${(p) => (p.variant ? p.theme.colors[p.variant] : p.theme.colors.accent)};

	@media screen and (max-width: 900px) {
		padding: 20px;
	}

	&:hover {
		cursor: pointer;
		background: ${(p) => p.theme.background};
	}
`;

const USER_QUERY = gql`
	query getCurrentUser {
		currentUser {
			id
			shortName
			isSuperuser
		}
	}
`;

const DropdownMenu = () => {
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const { toggle, isDark } = useContext(ThemeContext);
	const { data, loading, error } = useQuery(USER_QUERY);

	useEffect(() => {
		const pageClickEvent = (e) => {
			if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
				setIsActive(!isActive);
			}
		};

		if (isActive) {
			window.addEventListener('click', pageClickEvent);
		}

		return () => {
			window.removeEventListener('click', pageClickEvent);
		};
	}, [isActive]);

	return (
		<DropdownContainer>
			<UserPanel onClick={() => setIsActive(!isActive)} active={isActive}>
				<span>{!loading && !error && data.currentUser.shortName}</span>
				<FaUserAlt />
			</UserPanel>

			<Menu ref={dropdownRef} active={isActive}>
				<NavLink to="/Profile" onClick={() => setIsActive(!isActive)}>
					<MenuItem>
						Profile <FiUser />
					</MenuItem>
				</NavLink>
				{!loading && !error && data.currentUser.isSuperuser && (
					<a href="/admin">
						<MenuItem>
							Admin <FiTrello />
						</MenuItem>
					</a>
				)}
				<MenuItem
					onClick={() => {
						toggle();
						setIsActive(!isActive);
					}}
				>
					Switch theme {isDark ? <RiSunLine /> : <RiMoonLine />}
				</MenuItem>
				<a href="/users/logout">
					<MenuItem>
						Logout <FiLogOut />
					</MenuItem>
				</a>
			</Menu>
		</DropdownContainer>
	);
};

const Topbar = () => {
	const [open, setOpen] = useContext(SidebarContext);

	return (
		<TopbarContainer>
			<Hamburger state={open} onClick={() => setOpen(!open)}>
				<span />
				<span />
				<span />
			</Hamburger>

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

			<DropdownMenu />
		</TopbarContainer>
	);
};

export default Topbar;
