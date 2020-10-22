import styled from 'styled-components';

export const MenuStyled = styled.nav`
	align-items: flex-start;
	display: flex;
	flex-direction: column;

	padding-left: 20px;
	padding-top: 30px;
	height: 100vh;

	white-space: nowrap;

	width: ${({ open }) => (open ? '280px' : '80px')};
	background-color: ${(p) => p.theme.background};
	border-right: 2px solid ${(p) => p.theme.textSecondary};

	@media (max-width: ${({ theme }) => theme.mobile}) {
		width: ${({ open }) => (open ? '100%' : '0')};
		border: none;
		background-color: ${(p) => p.theme.background};
	}

	> a {
		text-decoration: none;
		font-size: 30px;
		color: ${(p) => p.theme.text};
		> span {
			visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
		}
	}
`;

export const Hamburger = styled.div`
	/* stylelint-disable -- idk. */
	width: 30px;
	height: 24px;
	z-index: 10;
	margin-left: 4px;
	margin-bottom: 20px;
	& span {
		display: block;
		position: relative;
		border-radius: 3px;
		width: 30px;
		height: 5px;
		transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s;

		background: ${(p) => (p.open ? p.theme.colors.error : p.theme.text)};
	}

	& span:nth-child(1) {
		transform: ${(p) => (p.open ? 'translateY(9px) rotate(45deg)' : '')};
	}

	& span:nth-child(3) {
		transform: ${(p) => (p.open ? 'translateY(-9px) rotate(-45deg)' : '')};
	}

	& span:nth-child(2) {
		margin-top: 4px;
		margin-bottom: 4px;
		opacity: ${(p) => (p.open ? 0 : 1)};
		transition: opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s;
	}
	/*stylelint-enable*/
`;

export const Spacer = styled.div`
	flex-grow: 1;
`;
