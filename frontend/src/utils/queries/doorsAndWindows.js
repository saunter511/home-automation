import { gql } from '@apollo/client';

export const GET_ROOM_DOORSANDWINDOWS = gql`
	query RoomLamps {
		rooms {
			id
			name
			appliances {
				... on Door {
					id
					name
					state
				}
				... on Window {
					id
					name
					state
				}
			}
		}
	}
`;

export const GET_DOORS = gql`
	query Doors {
		doors {
			id
			name
			room {
				id
			}
			state
		}
	}
`;

export const GET_WINDOWS = gql`
	query Windows {
		windows {
			id
			name
			room {
				id
			}
			state
		}
	}
`;

export const WINDOWS_SUB = gql`
	subscription WindowsSub {
		window {
			id
			state
		}
	}
`;

export const DOORS_SUB = gql`
	subscription DoorsSub {
		door {
			id
			state
		}
	}
`;
