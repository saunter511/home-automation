import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { TOGGLE_ROLLER } from 'Utils/Queries/rollers';

const RollerButton = styled.div`
	width: 30px;
	height: 30px;
	border: 1px solid ${(p) => p.theme.text.primary};
	border-top: 3px solid ${(p) => p.theme.text.primary};
	overflow: hidden;

	&:hover {
		cursor: pointer;
	}

	& div {
		z-index: 100;
		width: 100%;
		height: 100%;
		transform: ${(p) => (p.open ? 'translateY(-75%)' : 'translateY(-0%)')};
		transition: transform 0.8s;

		& div:nth-child(even) {
			height: 20%;
			background: ${(p) => p.theme.text.secondary};
		}

		& div:nth-child(odd) {
			height: 20%;
			filter: brightness(70%);
			background: ${(p) => p.theme.text.secondary};
		}
	}
`;

const RollerRow = styled.div`
	display: flex;
	align-items: center;
	height: 40px;

	& ${RollerButton} {
		margin-right: 10px;
	}

	&:hover {
		cursor: pointer;
	}
`;

const Roller = ({ Roller }) => {
	const [toggleRoller] = useMutation(TOGGLE_ROLLER);

	return (
		<RollerRow
			onClick={() => {
				toggleRoller({ variables: { id: Roller.id } });
				console.log(Roller.open);
			}}
		>
			<RollerButton open={Roller.open}>
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</RollerButton>
			{Roller.name}
		</RollerRow>
	);
};

Roller.propTypes = {
	Roller: PropTypes.object,
};

export default Roller;
