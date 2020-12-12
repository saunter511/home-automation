import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BoxHeader } from 'Theme/Components';

const ChatHeaderWrapper = styled(BoxHeader)`
	&:hover {
		cursor: pointer;
	}
`;

const ChatHeader = ({ close }) => {
	return <ChatHeaderWrapper onClick={close}>Home chat</ChatHeaderWrapper>;
};

ChatHeader.propTypes = {
	close: PropTypes.func,
};

export default ChatHeader;
