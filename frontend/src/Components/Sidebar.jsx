import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { RiDashboardFill } from '@meronex/icons/ri';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { AiFillBulb } from '@meronex/icons/ai';

const SidebarContainer = styled.nav`
	grid-area: sidebar;
	width: ${(p) => p.theme.sidebar.width};

	display: flex;
	flex-direction: column;
	z-index: 100;
	height: 100%;

	transition: transform 0.4s;

	@media screen and (max-width: 900px) {
		position: fixed;
		transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(-100%)')};
		background: ${(p) => p.theme.background};
		top: ${(p) => p.theme.topbar.height};
		left: 0;
		bottom: 0;
		padding-top: 10px;
	}
`;

const Overlay = styled(motion.div)`
	@media screen and (min-width: 900px) {
		display: none;
	}

	@media screen and (max-width: 900px) {
		position: fixed;
		top: ${(p) => p.theme.topbar.height};
		left: 0;
		right: 0;
		bottom: 0;
		background: rgb(0, 0, 0);

		opacity: 0.6;

		&:hover {
			cursor: pointer;
		}
	}
`;

const PageLink = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	width: 100%;

	text-decoration: none;
	color: ${(p) => p.theme.text.primary};

	padding: 0 10px;

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
		font-size: 0.9rem;
	}
`;

const AnimatedLinkBackground = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -10;
	margin: -10px -10px;

	border-left: 5px solid ${(p) => p.theme.colors.accent};

	background: ${(p) => p.theme.sidebar.linkActive};
`;

const AnimatedPageLink = (props) => {
	const { pathname } = useLocation();

	return (
		<PageLink to={props.to} end={props.end}>
			{props.to == pathname ? <AnimatedLinkBackground layoutId="current" /> : null}
			{props.children}
		</PageLink>
	);
};

AnimatedPageLink.propTypes = {
	to: PropTypes.string,
	end: PropTypes.bool,
	children: PropTypes.array,
};

export const SidebarContext = createContext([false, () => {}]);

const Sidebar = () => {
	const [open, setOpen] = useContext(SidebarContext);

	const location = useLocation();

	useEffect(() => {
		setTimeout(() => setOpen(false), 250);
	}, [location, setOpen]);

	return (
		<>
			<SidebarContainer open={open}>
				<AnimateSharedLayout>
					<AnimatedPageLink to="/" end>
						<RiDashboardFill />
						<div>Dashboard</div>
					</AnimatedPageLink>
					<AnimatedPageLink to="/lamps" end>
						<AiFillBulb />
						<div>Lamps</div>
					</AnimatedPageLink>
				</AnimateSharedLayout>
			</SidebarContainer>
			{open && <Overlay onClick={() => setOpen(false)} />}
		</>
	);
};

export default Sidebar;
