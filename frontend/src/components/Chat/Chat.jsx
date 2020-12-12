import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Box, BoxContent } from 'Theme/Components';

import ChatButton from './ChatButton';
import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import InputBox from './InputBox';

const ChatWrapper = styled(Box)`
	position: fixed;

	bottom: 15px;
	right: 10px;

	max-width: 600px;
	width: calc(100% - 20px);

	height: 300px;
	z-index: 100;

	transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(110%)')};
	transition: transform 0.5s;

	& ${BoxContent} {
		display: flex;
		flex-direction: column;
		height: 95%;
		padding: 0;
	}
`;

const Chat = () => {
	const [open, setOpen] = useState(false);

	return (
		<motion.div>
			<ChatButton open={() => setOpen(true)} />

			<ChatWrapper open={open}>
				<ChatHeader close={() => setOpen(false)} />
				<BoxContent>
					<MessageBox />
					<InputBox />
				</BoxContent>
			</ChatWrapper>
		</motion.div>
	);
};

export default Chat;
