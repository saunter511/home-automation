import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BoxHeader = styled.h3`
	margin: 2px 0;
	width: 100%;
	user-select: none;
	color: ${(p) => p.theme.text.secondary};
`;

export const BoxContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px 0;
`;

const Box = styled(motion.div)`
	display: flex;
	flex-direction: column;

	padding: 10px;
	min-height: 100px;

	background: ${(p) => p.theme.box.background};
	box-shadow: ${(p) => p.theme.box.shadow};

	border-left: 3px solid ${(p) => (p.variant ? p.theme.colors[p.variant] : p.theme.colors.accent)};
`;

Box.defaultProps = {
	variant: 'accent',
};

export default Box;
