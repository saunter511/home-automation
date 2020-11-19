import PropTypes from 'prop-types';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';

import Sensor from './Sensor';

const Room = ({ room }) => {
	return (
		<Box>
			<BoxHeader>{room.name}</BoxHeader>
			<BoxContent>
				{room.appliances.map((appliance) => {
					if (appliance.__typename == 'TempSensor')
						return <Sensor key={appliance.id} sensor={appliance} />;
				})}
			</BoxContent>
		</Box>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
