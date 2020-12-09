import { gql } from '@apollo/client';

export const GET_ROOM_ROLLERS = gql`
	query RoomRollers {
		rooms {
			id
			name
			appliances {
				... on Roller {
					id
					name
					state
				}
			}
		}
	}
`;

export const GET_ROLLERS = gql`
	query Rollers {
		rollers {
			id
			name
			state
			room {
				name
			}
		}
	}
`;

export const TOGGLE_ROLLER = gql`
	mutation toggleRoller($id: ID) {
		toggleRoller(id: $id) {
			ok
		}
	}
`;

export const ROLLER_SUB = gql`
	subscription subRoller {
		roller {
			id
			state
		}
	}
`;
