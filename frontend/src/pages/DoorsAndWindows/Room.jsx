import PropTypes from 'prop-types';
import { Box, BoxHeader, BoxContent } from 'Theme/Components';

import DoorsAndWindows from './DoorAndWindow';

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
					if (appliance.__typename == 'Door' || appliance.__typename == 'Window')
						return <DoorsAndWindows doorOrWindow={appliance} key={appliance.id} />;
				})}
			</BoxContent>
		</Box>
	);
};

Room.propTypes = {
	room: PropTypes.object,
};

export default Room;
