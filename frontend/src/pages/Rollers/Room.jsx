import PropTypes from 'prop-types';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';

import Roller from './Roller';

const Room = ({ room }) => {
	return (
		<Box>
			<BoxHeader>{room.name}</BoxHeader>
			<BoxContent>
				{room.appliances.map((appliance) => {
					if (appliance.__typename == 'Roller')
						return <Roller key={appliance.id} roller={appliance} />;
				})}
			</BoxContent>
		</Box>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
