import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MdcWindowClosedVariant, MdcDoor } from '@meronex/icons/mdc';

const Window = styled(MdcWindowClosedVariant)`
	color: ${(p) => p.theme.text.secondary};
	font-size: 30px;

	& path:first-child {
		fill: ${(p) => {
			switch (p.state) {
				case true:
					return 'hsl(213, 89%, 53%)';
				case false:
					return (p) => p.theme.text.secondary;
			}
		}};

		transition: fill 0.5s;
	}
`;

const Door = styled(MdcDoor)`
	color: ${(p) => p.theme.text.secondary};
	font-size: 30px;

	& path:first-child {
		fill: ${(p) => {
			switch (p.state) {
				case true:
					return 'hsl(0, 61%, 50%)';
				case false:
					return (p) => p.theme.text.secondary;
			}
		}};

		transition: fill 0.5s;
	}
`;

const DoorOrWindowRow = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
`;

const DoorOrWindow = ({ doorOrWindow }) => {
	return (
		<DoorOrWindowRow>
			{doorOrWindow.__typename == 'Door' ? (
				<Door state={doorOrWindow.state} />
			) : (
				<Window state={doorOrWindow.state} />
			)}
			{doorOrWindow.name}
		</DoorOrWindowRow>
	);
};

DoorOrWindow.propTypes = {
	doorOrWindow: PropTypes.object,
};

export default DoorOrWindow;
