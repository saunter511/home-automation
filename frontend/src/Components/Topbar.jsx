import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';

import { SidebarContext } from './Sidebar';
import Hamburger from 'Theme/Components/Hamburger';
import Spacer from 'Theme/Components/Spacer';

const TopbarContainer = styled.div`
	position: fixed;
	top: 0;

	z-index: 100;

	display: flex;
	align-items: center;

	padding: 0 5px;

	width: 100%;
	height: ${(p) => p.theme.topbar.height};

	background: ${(p) => p.theme.topbar.background};
	color: ${(p) => p.theme.topbar.text};
`;

const TopbarButton = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	text-decoration: none;

	color: ${(p) => p.theme.topbar.text};

	font-size: 15px;

	padding: 0 5px;

	&:hover {
		color: ${(p) => p.theme.topbar.textActive};
	}

	&.active {
		color: ${(p) => p.theme.topbar.textActive};
	}

	& svg {
		font-size: 25px;
		margin: 0 5px;
	}
`;

const Profile = styled(TopbarButton)`
	& svg {
		border-radius: 50%;
		padding: 2px;
		border: 2px solid ${(p) => darken(0.3, p.theme.topbar.text)};
	}
`;

const SidebarHamburger = styled(Hamburger)`
	@media screen and (min-width: 800px) {
		display: none;
	}
`;

const Settings = styled(TopbarButton)``;

const Topbar = () => {
	const [open, setOpen] = React.useContext(SidebarContext);

	return (
		<TopbarContainer>
			<SidebarHamburger state={open} onClick={() => setOpen(!open)}>
				<span />
				<span />
				<span />
			</SidebarHamburger>

			<Spacer />

			<Settings to="/settings">
				<RiSettings4Fill />
			</Settings>

			<Profile to="/profile">
				<FaUserAlt />
			</Profile>
		</TopbarContainer>
	);
};

export default Topbar;
