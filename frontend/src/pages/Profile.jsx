import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import styled from 'styled-components';
import {
	Box,
	BoxContent,
	BoxHeader,
	Button,
	ButtonRow,
	Error,
	Loading,
	PageContainer,
} from 'Theme/Components';
import { GET_USER } from 'Utils/queries/users';

const ProfileGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
	grid-gap: 15px;

	@media screen and (max-width: 1300px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;

const containerVariants = {
	before: {},
	after: {
		transition: { staggerChildren: 0.05 },
	},
};

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

const Profile = () => {
	const { loading, error, data } = useQuery(GET_USER);

	if (loading) return <Loading />;
	if (error) return <Error message={error.message} />;

	return (
		<PageContainer variants={containerVariants} initial="before" animate="after">
			<ProfileGrid>
				<Box variants={boxVariants}>
					<BoxHeader>Profile</BoxHeader>
					<BoxContent>
						<div>{data.currentUser.fullName} </div>
						<div>
							Last login at{' '}
							{format(new Date(data.currentUser.lastLogin), 'dd MMMM - HH:mm:ss')}{' '}
						</div>

						<ButtonRow>
							<Button href="/users/password-change">Change password</Button>
						</ButtonRow>
					</BoxContent>
				</Box>
			</ProfileGrid>
		</PageContainer>
	);
};

export default Profile;
