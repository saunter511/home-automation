import styled from 'styled-components';
import { motion } from 'framer-motion';

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

export const BoxHeader = styled.h4`
	margin: 4px 0;
	width: 100%;
`;

export const BoxContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px 0;
`;

export default Box;
