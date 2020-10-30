import { createContext, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { RiDashboardFill } from 'react-icons/ri';

const SidebarContainer = styled.div`
	position: fixed;
	top: ${(p) => p.theme.topbar.height};

	display: flex;
	flex-direction: column;

	z-index: 100;

	height: 100%;
	background: ${(p) => p.theme.sidebar.background};

	@media screen and (max-width: 800px) {
		width: ${(p) => p.theme.sidebar.mobile.width};

		box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 4px;
		transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(-100%)')};
		transition: transform 0.2s;
	}

	@media screen and (min-width: 800px) {
		width: ${(p) => p.theme.sidebar.desktop.width};

		box-shadow: ${(p) => p.theme.box.shadow};
	}
`;

const PageLink = styled(NavLink)`
	display: flex;
	height: 30px;
	width: 100%;
	align-items: center;
	text-decoration: none;

	padding: 2px 5px;

	justify-content: ${(p) => (p.open ? 'space-between' : 'center')};

	color: ${(p) => p.theme.text.secondary};

	& svg {
		width: 25px;
		height: 25px;
	}

	& div {
		width: 100%;
		display: flex;
		justify-content: left;
		padding-left: 10px;
		align-items: center;
		height: 40px;
		font-size: 15px;
	}

	&.active {
		color: ${(p) => p.theme.text.primary};
		background: ${(p) => p.theme.sidebar.linkActive};
	}

	&:hover {
		color: ${(p) => p.theme.text.primary};
	}
`;

export const SidebarContext = createContext([false, () => {}]);

const Sidebar = () => {
	const [open] = useContext(SidebarContext);

	return (
		<SidebarContainer open={open}>
			<PageLink to="/" end>
				<RiDashboardFill />
				<div>Dashboard</div>
			</PageLink>
		</SidebarContainer>
	);
};

export default Sidebar;
