import React from 'react';
// import styled from 'styled-components';
import PageHeader from 'Theme/Components/PageHeader';
import PageContainer from 'Theme/Components/PageContainer';
import Loading from 'Theme/Components/Loading';
import Error from 'Theme/Components/Error';
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
	query getUser {
		currentUser {
			fullName
			lastLogin
		}
	}
`;

const Profile = () => {
	const { loading, error, data } = useQuery(GET_USER);
	if (loading) return <Loading />;
	if (error) return <Error message={error} />;

	return (
		<PageContainer>
			<PageHeader>Profile</PageHeader>
			<p> User: {data.currentUser.fullName} </p>
			<p> Last login: {data.currentUser.lastLogin} </p>
		</PageContainer>
	);
};

export default Profile;
