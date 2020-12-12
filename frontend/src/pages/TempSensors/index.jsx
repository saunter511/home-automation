import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Error, Loading, PageContainer } from 'Theme/Components';

import { GET_ROOM_TEMP_SENSORS, TEMP_SENSOR_UPDATE_SUB } from 'Utils/queries/tempSensors';

import Room from './Room';

const RoomGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
	grid-gap: 15px;

	@media screen and (max-width: 1300px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const TempSensors = () => {
	const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_ROOM_TEMP_SENSORS);

	useEffect(() => {
		refetch();
		subscribeToMore({
			document: TEMP_SENSOR_UPDATE_SUB,
		});
	}, [refetch, subscribeToMore]);

	if (loading) return <Loading />;
	if (error) return <Error message={error} />;

	const roomList = data.rooms.filter(
		(room) =>
			room.appliances.filter((appliance) => appliance.__typename == 'TempSensor').length > 0
	);

	return (
		<PageContainer>
			<RoomGrid>
				{roomList.map((room) => (
					<Room room={room} key={room.id} />
				))}
			</RoomGrid>
		</PageContainer>
	);
};

export default TempSensors;
