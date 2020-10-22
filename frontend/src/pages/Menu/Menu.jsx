import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { MenuStyled, Hamburger, Spacer } from './styles';

const Menu = ({ open, setHamburger }) => {
	return (
		<MenuStyled open={open}>
			<Hamburger
				open={open}
				onClick={() => {
					setHamburger(!open);
				}}
			>
				<span />
				<span />
				<span />
			</Hamburger>

			<a href="/#/">
				<i>
					<RiDashboardLine />
				</i>
				<span label="about us">Dashboard</span>
			</a>
			<a href="/#/profile">
				<i>
					<BsFillPersonFill />
				</i>
				<span label="about us">Profile</span>
			</a>

			<Spacer />
			<a href="/#/settings">
				<i>
					<FiSettings />
				</i>
				<span label="settings">Settings</span>
			</a>
			<a href="/users/logout">
				<i>
					<FiLogOut />
				</i>
				<span label="logout">Logout</span>
			</a>
		</MenuStyled>
	);
};

Menu.propTypes = {
	open: PropTypes.bool,
	setHamburger: PropTypes.func,
};

export default Menu;
