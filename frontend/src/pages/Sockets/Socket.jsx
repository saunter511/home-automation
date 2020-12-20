import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { MdcPowerSocketFr } from '@meronex/icons/mdc';

import { Loading } from 'Theme/Components';

import { TOGGLE_SOCKET } from 'Utils/queries/sockets';

const PowerSocket = styled(MdcPowerSocketFr)`
	color: ${(p) => p.theme.text.secondary};
	font-size: 30px;

	& path:first-child {
		fill: ${(p) => {
			switch (p.state) {
				case 'on':
					return 'hsl(120,100%,25%, 0.8)';
				case 'off':
					return (p) => p.theme.text.secondary;
				case 'requestOff':
					return 'hsl(120,100%,25%, 0.4)';
				case 'requestOn':
					return 'hsl(120,100%,25%, 0.4)';
			}
		}};

		transition: fill 0.5s;
	}
`;

const SocketRow = styled.div`
	display: flex;
	align-items: center;
	height: 40px;

	& ${PowerSocket} {
		margin-right: 10px;
	}

	& ${Loading} {
		margin: 0 5px;
	}

	&:hover {
		cursor: pointer;
	}
`;

const Socket = ({ socket }) => {
	const [toggleSocket] = useMutation(TOGGLE_SOCKET);

	const switching = socket.state == 'requestOn' || socket.state == 'requestOff';

	return (
		<SocketRow onClick={() => toggleSocket({ variables: { id: socket.id } })}>
			<PowerSocket state={socket.state} />
			{socket.name}

			{switching ? <Loading /> : null}
		</SocketRow>
	);
};

Socket.propTypes = {
	socket: PropTypes.object,
};

export default Socket;
