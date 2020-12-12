import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Letter = styled(motion.span)`
	font-size: 2rem;
	letter-spacing: 1rem;
	font-weight: 900;
`;

const parentVariants = {
	visible: { transition: { staggerChildren: 0.3 } },
	hidden: { transition: { staggerChildren: 0.3 } },
};

const childVariants = {
	visible: { scale: 1, transition: { duration: 0.5 } },
	hidden: { scale: 0, transition: { duration: 0.5 } },
};

const SiteLoading = () => {
	const letters = Array.from('LOADING');

	return (
		<LoadingContainer variants={parentVariants} initial="hidden" animate="visible">
			{letters.map((letter, idx) => (
				<Letter key={idx} variants={childVariants}>
					{letter}
				</Letter>
			))}
		</LoadingContainer>
	);
};

export default SiteLoading;
