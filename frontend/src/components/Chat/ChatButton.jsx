import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import MdChatboxes from '@meronex/icons/ios/MdChatboxes';

const ChatButtonWrapper = styled(motion.div)`
	position: fixed;
	bottom: 20px;
	right: 20px;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 60px;
	height: 60px;

	border-radius: 50%;

	background: ${(p) => p.theme.chat.background};
	color: ${(p) => p.theme.text.secondary};

	box-shadow: 'hsla(0, 0%, 0%, 0.25) 0 0 2px';

	transition: color 0.5s;

	&:hover {
		cursor: pointer;
		color: ${(p) => p.theme.text.primary};
	}

	& svg {
		width: 30px;
		height: 30px;
	}
`;

const buttonVariants = {
	open: {
		opacity: 0,
	},
	closed: {
		opacity: 1,
	},
};

const ChatButton = ({ open }) => {
	return (
		<ChatButtonWrapper variants={buttonVariants} onClick={open}>
			<MdChatboxes />
		</ChatButtonWrapper>
	);
};

ChatButton.propTypes = {
	open: PropTypes.func,
};

export default ChatButton;
