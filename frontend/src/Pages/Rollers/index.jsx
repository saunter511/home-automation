import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PageContainer, Loading, Error } from 'Theme/Components';

import Room from './Room';

import { GET_ROOM_ROLLERS, ROLLER_SUB } from 'Utils/Queries/rollers';

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

const Lamps = () => {
	const { loading: queryLoading, error: queryError, data, refetch, subscribeToMore } = useQuery(
		GET_ROOM_ROLLERS
	);

	useEffect(() => {
		refetch();
		subscribeToMore({
			document: ROLLER_SUB,
		});
	}, [refetch, subscribeToMore]);

	if (queryLoading) return <Loading />;
	if (queryError) return <Error message={queryError} />;

	const roomList = data.rooms.filter(
		(room) => room.appliances.filter((appliance) => appliance.__typename == 'Roller').length > 0
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

export default Lamps;
