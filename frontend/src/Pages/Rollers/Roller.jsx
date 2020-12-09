import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { Loading } from 'Theme/Components';

import { TOGGLE_ROLLER } from 'Utils/Queries/rollers';

const RollerButton = styled.div`
	width: 40px;
	height: 40px;

	border-width: 5px 2px 2px 2px;
	border-style: solid;
	border-color: ${(p) => p.theme.text.secondary};
	background: rgba(0, 0, 0, 0.2);

	overflow: hidden;

	&:hover {
		cursor: pointer;
	}

	& div {
		z-index: 100;
		width: 100%;
		height: 100%;

		transform: ${(p) => {
			switch (p.state) {
				case 'opened':
					return 'translateY(-65%)';
				case 'requestClose':
					return 'translateY(-50%)';
				case 'closed':
					return 'translateY(0%)';
				case 'requestOpen':
					return 'translateY(-15%)';
			}
		}};
		transition: transform 0.5s;

		& div {
			height: 20%;

			&:nth-child(even) {
				background: ${(p) => p.theme.rollers.color1};
			}

			&:nth-child(odd) {
				background: ${(p) => p.theme.rollers.color2};
			}
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

	& ${Loading} {
		margin: 0 5px;
	}

	&:hover {
		cursor: pointer;
	}
`;

const Roller = ({ roller }) => {
	const [toggleRoller] = useMutation(TOGGLE_ROLLER);

	const moving = roller.state == 'requestOpen' || roller.state == 'requestClose';

	return (
		<RollerRow onClick={() => toggleRoller({ variables: { id: roller.id } })}>
			<RollerButton state={roller.state}>
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</RollerButton>
			{roller.name}
			{moving ? <Loading /> : null}
		</RollerRow>
	);
};

Roller.propTypes = {
	roller: PropTypes.object,
};

export default Roller;
