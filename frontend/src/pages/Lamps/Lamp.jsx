import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { AiTwotoneBulb } from '@meronex/icons/ai';

import { Loading } from 'Theme/Components';

import { TOGGLE_LAMP } from 'Utils/queries/lamps';

const Bulb = styled(AiTwotoneBulb)`
	color: ${(p) => p.theme.text.secondary};
	font-size: 30px;

	& path:first-child {
		fill: ${(p) => {
			switch (p.state) {
				case 'on':
					return 'hsla(50, 100%, 50%, 0.8)';
				case 'off':
					return 'rgba(0, 0, 0, 0.1)';
				case 'request-off':
					return 'hsla(50, 100%, 50%, 0.7)';
				case 'request-on':
					return 'hsla(50, 100%, 50%, 0.2)';
			}
		}};

		transition: fill 0.5s;
	}
`;

const LampRow = styled.div`
	display: flex;
	align-items: center;
	height: 40px;

	& ${Bulb} {
		margin-right: 10px;
	}

	& ${Loading} {
		margin: 0 5px;
	}

	&:hover {
		cursor: pointer;
	}
`;

const Lamp = ({ lamp }) => {
	const [toggleLamp] = useMutation(TOGGLE_LAMP);

	const switching = lamp.state == 'request-on' || lamp.state == 'request-off';

	return (
		<LampRow onClick={() => toggleLamp({ variables: { id: lamp.id } })}>
			<Bulb state={lamp.state} />
			{lamp.name}

			{switching ? <Loading /> : null}
		</LampRow>
	);
};

Lamp.propTypes = {
	lamp: PropTypes.object,
};

export default Lamp;
