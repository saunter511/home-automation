import PropTypes from 'prop-types';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';

import Socket from './Socket';

const boxVariants = {
	before: {
		opacity: 0,
		y: -20,
	},
	after: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
		},
	},
};

const Room = ({ room }) => {
	return (
		<Box variants={boxVariants}>
			<BoxHeader>{room.name}</BoxHeader>
			<BoxContent>
				{room.appliances.map((appliance) => {
					if (appliance.__typename == 'Socket')
						return <Socket socket={appliance} key={appliance.id} />;
				})}
			</BoxContent>
		</Box>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
