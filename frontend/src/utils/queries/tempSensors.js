import { gql } from '@apollo/client';

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
