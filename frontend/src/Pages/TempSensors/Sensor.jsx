import { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeContext } from 'Theme/index';
import { format, subDays } from 'date-fns';

import { ResponsiveContainer, LineChart, Line, Tooltip, YAxis, XAxis } from 'recharts';

const SensorWrapper = styled.div`
	display: flex;
	flex-direction: column;

	& div:first-child {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3px;
		margin-top: 5px;
	}
`;

const ChartContainer = styled(ResponsiveContainer)`
	background: ${(p) => p.theme.background};
	border-radius: 5px;

	margin: 0;
`;

const Sensor = ({ sensor }) => {
	const { theme } = useContext(ThemeContext);

	const timeNow = new Date();
	const time24hago = subDays(timeNow, 1);

	const history = sensor.history
		.filter((h) => +new Date(h.readTime) > subDays(new Date(), 1))
		.map((h) => ({
			timeVal: +new Date(h.readTime),
			time: format(new Date(h.readTime), 'yyyy-MM-dd HH:mm'),
			temp: h.value,
		}));

	return (
		<SensorWrapper>
			<div>
				<span>{sensor.name}</span> <span>{sensor.lastRead}°C</span>
			</div>
			<ChartContainer width="99.9%" aspect={6}>
				<LineChart data={history}>
					<Line
						type="monotone"
						dataKey="temp"
						unit="°C"
						dot={false}
						strokeWidth={3}
						stroke={theme.colors.accent}
					/>

					<YAxis domain={['dataMin', 'dataMax']} hide={true} />
					<XAxis
						dataKey="timeVal"
						domain={[+time24hago, +timeNow]}
						hide={true}
						type="number"
						interval={360000}
					/>

					<Tooltip
						cursor={false}
						labelFormatter={(label) => format(new Date(label), 'HH:mm:ss')}
						contentStyle={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							background: theme.box.background,
							borderColor: theme.background,
						}}
						labelStyle={{
							color: theme.text.secondary,
						}}
						itemStyle={{
							color: theme.text.primary,
						}}
					/>
				</LineChart>
			</ChartContainer>
		</SensorWrapper>
	);
};

Sensor.propTypes = {
	sensor: PropTypes.object,
};

export default Sensor;
