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

export const GET_DOORSANDWINDOWS = gql`
	query DoorsAndWindows {
		doors {
			id
			name
			room {
				id
			}
			state
		}
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
