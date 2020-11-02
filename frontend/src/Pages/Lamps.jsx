import styled from 'styled-components';
import { gql, useQuery, useMutation } from '@apollo/client';
import PageHeader from 'Theme/Components/PageHeader';
import PageContainer from 'Theme/Components/PageContainer';
import Loading from 'Theme/Components/Loading';
import Error from 'Theme/Components/Error';
import CategoryHeader from 'Theme/Components/CategoryHeader';
import Box from 'Theme/Components/Box';
import Button from 'Theme/Components/Button';
import Spacer from 'Theme/Components/Spacer';

import MdcReload from '@meronex/icons/mdc/MdcReload';
import MdcLightbulbOffOutline from '@meronex/icons/mdc/MdcLightbulbOffOutline';
import MdcLightbulbOnOutline from '@meronex/icons/mdc/MdcLightbulbOnOutline';

const GET_LAMPS = gql`
	query Rooms {
		rooms {
			id
			name
			codeName
			floor
			appliances {
				... on Lamp {
					id
					name
					applianceId
					state
				}
			}
		}
	}
`;

const TOGGLE_LAMP = gql`
	mutation toggleLamp($id: ID) {
		toggleLamp(id: $id) {
			ok
			newState
		}
	}
`;

const LampsGrid = styled.div`
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

const Refresh = styled.div`
	display: inline-flex;
	position: relative;
	top: 5px;

	color: ${(p) => p.theme.text.seconday};
	&:hover {
		color: ${(p) => p.theme.text.primary};
	}
`;

const LampContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin: 3px;
`;

const Lamps = () => {
	const { loading: queryLoading, error: queryError, data, refetch } = useQuery(GET_LAMPS, {
		pollInterval: 5000,
	});

	const [toggleLamp, { loading: mutationLoading }] = useMutation(TOGGLE_LAMP, {
		refetchQueries: [{ query: GET_LAMPS }],
		awaitRefetchQuerieswait: true,
	});

	if (queryLoading) return <Loading />;
	if (queryError) return <Error message={queryError} />;

	const roomList = data.rooms
		.filter((room) => room.appliances.length > 0)
		.map((room) => {
			return (
				<Box key={room.name}>
					<CategoryHeader> {room.name} </CategoryHeader>
					{room.appliances.map((lamp) => {
						return (
							<LampContainer key={lamp.id}>
								{' '}
								{lamp.name}
								<Spacer />
								<Button
									onClick={() => {
										toggleLamp({ variables: { id: lamp.id } });
									}}
								>
									{mutationLoading || queryLoading ? (
										<Loading />
									) : lamp.state ? (
										<MdcLightbulbOnOutline />
									) : (
										<MdcLightbulbOffOutline />
									)}
								</Button>
							</LampContainer>
						);
					})}
				</Box>
			);
		});

	return (
		<PageContainer>
			<PageHeader>
				Lamps
				<Refresh onClick={() => refetch()}>
					<MdcReload />
				</Refresh>
			</PageHeader>
			<LampsGrid>{roomList}</LampsGrid>
		</PageContainer>
	);
};

export default Lamps;
