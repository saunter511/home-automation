import PropTypes from 'prop-types';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';

import Lamp from './Lamp';

const Room = ({ room }) => {
	return (
		<Box>
			<BoxHeader>{room.name}</BoxHeader>
			<BoxContent>
				{room.appliances.map((appliance) => {
					if (appliance.__typename == 'Lamp')
						return <Lamp lamp={appliance} key={appliance.id} />;
				})}
			</BoxContent>
		</Box>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
