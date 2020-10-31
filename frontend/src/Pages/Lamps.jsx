import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import PageHeader from 'Theme/Components/PageHeader';
import PageContainer from 'Theme/Components/PageContainer';
import Loading from 'Theme/Components/Loading';
import Error from 'Theme/Components/Error';
import CategoryHeader from 'Theme/Components/CategoryHeader';
import Box from 'Theme/Components/Box';

import MdcReload from '@meronex/icons/mdc/MdcReload';

const GET_LAMPS = gql`
	query getLamp {
		rooms {
			name
		}
		lamps {
			id
			name
			room {
				name
			}
			state
		}
	}
`;

const LampsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));

	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 800px) {
		grid-template-columns: 1fr;
	}
`;

const Status = styled.div`
	display: inline-block;
	transition: 0.1s;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${(props) => (props.status ? 'green' : 'red')};
`;

const Refresh = styled.div`
	display: inline-flex;
	position: relative;
	top: 5px;

	color: ${(p) => p.theme.text.seconday};
	&:hover {
		color: ${(p) => p.theme.text.primary};
	}
`;

const Lamps = () => {
	const { loading, error, data, refetch } = useQuery(GET_LAMPS, { pollInterval: 5000 });
	if (loading) return <Loading />;
	if (error) return <Error message={error} />;

	const roomList = data.rooms.map((room) => {
		console.log(data.lamps.room);
		return (
			<Box key={room.name}>
				<CategoryHeader> {room.name} </CategoryHeader>
				{data.lamps.map((lamp) => {
					if (lamp.room.name == room.name)
						return (
							<div key={lamp.id}>
								{' '}
								{lamp.name} <Status status={lamp.state} />{' '}
							</div>
						);
				})}
			</Box>
		);
	});

	return (
		<PageContainer>
			<PageHeader>
				{' '}
				Lamps{' '}
				<Refresh onClick={() => refetch()}>
					{' '}
					<MdcReload />
				</Refresh>
			</PageHeader>
			<LampsGrid>{roomList}</LampsGrid>
		</PageContainer>
	);
};

export default Lamps;
