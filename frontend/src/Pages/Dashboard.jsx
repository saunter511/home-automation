import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_LAMPS, LAMP_SUB } from 'Utils/queries';
import { Box, BoxHeader, BoxContent, PageContainer } from 'Theme/Components';

const DashGrid = styled.div`
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

const LampBox = () => {
	const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_LAMPS);

	useEffect(() => {
		refetch();
		subscribeToMore({
			document: LAMP_SUB,
		});
	}, [refetch, subscribeToMore]);

	if (loading) return null;
	if (error) return null;

	const litLamps = data.lamps.filter((lamp) => lamp.state);

	if (litLamps.length == 0) return null;

	return (
		<Box variant="warning">
			<BoxHeader>Lit lamps</BoxHeader>
			<BoxContent>
				{litLamps.map((lamp) => (
					<div key={lamp.id}>
						{lamp.name} - {lamp.room.name}
					</div>
				))}
			</BoxContent>
		</Box>
	);
};

const TimeBox = styled.div`
	font-size: xx-large;
`;

const DateAndTimeBox = () => {
	const locale = 'en';
	const [today, setDate] = useState(new Date());
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 60 * 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);
	const day = today.toLocaleDateString(locale, { weekday: 'long' });
	const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
		month: 'long',
	})}\n\n`;

	const time = today.toLocaleTimeString(locale, {
		hour: 'numeric',
		hour12: false,
		minute: 'numeric',
	});

	return (
		<Box variant="success">
			<BoxHeader>{date}</BoxHeader>
			<BoxContent>
				<TimeBox>{time} </TimeBox>
			</BoxContent>
		</Box>
	);
};

const Dashboard = () => {
	return (
		<PageContainer>
			<DashGrid>
				<DateAndTimeBox />
				<LampBox />
			</DashGrid>
		</PageContainer>
	);
};

export default Dashboard;
