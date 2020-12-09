import { gql } from '@apollo/client';

export const GET_ROOM_LAMPS = gql`
	query RoomLamps {
		rooms {
			id
			name
			appliances {
				... on Lamp {
					id
					name
					state
				}
			}
		}
	}
`;

export const GET_LAMPS = gql`
	query Lamps {
		lamps {
			id
			name
			state
			room {
				name
			}
		}
	}
`;

export const TOGGLE_LAMP = gql`
	mutation toggleLamp($id: ID) {
		toggleLamp(id: $id) {
			ok
		}
	}
`;

export const LAMP_SUB = gql`
	subscription TestLamp {
		lamp {
			id
			state
		}
	}
`;

export const GET_ROOM_TEMP_SENSORS = gql`
	query RoomTempSensors {
		rooms {
			id
			name
			appliances {
				... on TempSensor {
					id
					applianceId
					name
					lastRead
					lastReadTime
					history {
						readTime
						value
					}
				}
			}
		}
	}
`;

export const TEMP_SENSOR_UPDATE_SUB = gql`
	subscription TempSensorUpdateSub {
		tempSensor {
			id
			lastRead
			lastReadTime
			history {
				readTime
				value
			}
		}
	}
`;

export const GET_BIRTHDAYS = gql`
	query getBirthdays {
		birthdaysThisMonth {
			birthDate
			fullName
		}
	}
`;

export const GET_USER = gql`
	query getUser {
		currentUser {
			id
			fullName
			lastLogin
		}
	}
`;
