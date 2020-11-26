import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format, subHours, roundToNearestMinutes } from 'date-fns';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';
import { Line } from 'react-chartjs-2';

import { useContext } from 'react';
import { ThemeContext } from 'Theme';

const RoomBox = styled(Box)`
	padding-bottom: 2px;
`;

const ChartContainer = styled.div`
	background: ${(p) => p.theme.background};
	padding: 5px;

	position: relative;
	width: 100%;
	height: 150px;

	margin: 0;

	& canvas {
		width: 100% !important;
	}
`;

const SensorLine = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 4px;

	& div:first-child {
		border-left: 4px solid ${(p) => p.color};
		padding: 3px 5px;
	}

	& div:last-child {
		padding: 3px 5px;
	}
`;

const getChartColor = (theme, applianceId) => {
	const colorMap = [
		theme.colors.accent,
		theme.colors.error,
		theme.colors.warning,
		theme.colors.success,
	];

	if (applianceId > colorMap.length) {
		return theme.text.primary;
	} else {
		return colorMap[applianceId - 1];
	}
};

const Room = ({ room }) => {
	const { theme } = useContext(ThemeContext);

	const sensors = room.appliances.filter((appliance) => appliance.__typename == 'TempSensor');

	const data = {
		datasets: sensors.map((sensor) => ({
			label: sensor.name,
			data: sensor.history.map((p) => ({
				y: p.value.toFixed(1),
				t: roundToNearestMinutes(new Date(p.readTime)),
			})),
			borderColor: getChartColor(theme, sensor.applianceId),
			backgroundColor: getChartColor(theme, sensor.applianceId),
			fill: false,
		})),
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,

		legend: {
			display: false,
		},

		scales: {
			xAxes: [
				{
					type: 'time',
					max: new Date(),
					min: subHours(12, new Date()),
					display: false,
				},
			],
			yAxes: [
				{
					display: true,
					gridLines: {
						display: false,
					},
				},
			],
		},
	};

	return (
		<RoomBox>
			<BoxHeader>{room.name}</BoxHeader>
			<BoxContent>
				<ChartContainer>
					<Line data={data} options={options} />
				</ChartContainer>

				{sensors.map((sensor) => {
					return (
						<SensorLine
							key={sensor.applianceId}
							color={getChartColor(theme, sensor.applianceId)}
						>
							<div>{sensor.name}</div>
							<div
								title={
									sensor.lastReadTime &&
									format(new Date(sensor.lastReadTime), 'yyyy-MM-dd @ HH:mm:ss')
								}
							>
								{sensor.lastRead ? `${sensor.lastRead.toFixed(1)} °C` : 'No data'}
							</div>
						</SensorLine>
					);
				})}
			</BoxContent>
		</RoomBox>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
