import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { AiTwotoneBulb } from '@meronex/icons/ai';

import { TOGGLE_LAMP } from 'Utils/queries';

const Bulb = styled(AiTwotoneBulb)`
	color: ${(p) => p.theme.text.secondary};
	font-size: 30px;

	& path:first-child {
		fill: ${(p) => (p.$state ? 'hsla(50, 100%, 50%, 0.8)' : 'transparent')};

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

	&:hover {
		cursor: pointer;
	}
`;

const Lamp = ({ lamp }) => {
	const [toggleLamp] = useMutation(TOGGLE_LAMP);

	return (
		<LampRow onClick={() => toggleLamp({ variables: { id: lamp.id } })}>
			<Bulb $state={lamp.state} />
			{lamp.name}
		</LampRow>
	);
};

Lamp.propTypes = {
	lamp: PropTypes.object,
};

export default Lamp;
