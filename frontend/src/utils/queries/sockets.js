import { gql } from '@apollo/client';

export const GET_ROOM_SOCKETS = gql`
	query RoomSockets {
		rooms {
			id
			name
			appliances {
				... on Socket {
					id
					name
					state
				}
			}
		}
	}
`;

export const GET_SOCKETS = gql`
	query Sockets {
		sockets {
			id
			name
			state
			room {
				name
			}
		}
	}
`;

export const TOGGLE_SOCKET = gql`
	mutation toggleSocket($id: ID) {
		toggleSocket(id: $id) {
			ok
		}
	}
`;

export const SOCKET_SUB = gql`
	subscription subSocket {
		socket {
			id
			state
		}
	}
`;
