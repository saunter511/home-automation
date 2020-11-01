import { gql, useQuery } from '@apollo/client';
import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'Theme';
import Box, { BoxHeader, BoxContent } from 'Theme/Components/Box';
import Button from 'Theme/Components/Button';
import Error from 'Theme/Components/Error';
import Loading from 'Theme/Components/Loading';
import PageContainer from 'Theme/Components/PageContainer';
import { format } from 'date-fns';

const GET_USER = gql`
	query getUser {
		currentUser {
			id
			fullName
			lastLogin
		}
	}
`;

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

const ButtonRow = styled.div`
	display: flex;
	margin-top: 10px;

	& a {
		width: 50%;
		margin-right: 5px;
	}
`;

const Profile = () => {
	const { toggle, isDark } = useContext(ThemeContext);

	const { loading, error, data } = useQuery(GET_USER);
	if (loading) return <Loading />;
	if (error) return <Error message={error.message} />;

	return (
		<PageContainer>
			<ProfileGrid>
				<Box>
					<BoxHeader>Profile</BoxHeader>
					<BoxContent>
						<div>{data.currentUser.fullName} </div>
						<div>
							Last login at{' '}
							{format(new Date(data.currentUser.lastLogin), 'dd MMMM - HH:mm:ss')}{' '}
						</div>

						<ButtonRow>
							<Button href="/users/password-change">Change password</Button>
							<Button href="/users/logout">Log out</Button>
						</ButtonRow>
					</BoxContent>
				</Box>

				<Box variant="error">
					<BoxHeader>Settings</BoxHeader>

					<ButtonRow>
						<Button onClick={() => toggle()}>
							Switch to {isDark ? 'light' : 'dark'} theme
						</Button>

						<Button href="/admin">Admin</Button>
					</ButtonRow>
				</Box>
			</ProfileGrid>
		</PageContainer>
	);
};

export default Profile;
