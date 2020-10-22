import styled from 'styled-components';
import React from 'react';

const ProfileStyled = styled.div`
	font-size: 100px;
`;

const Profile = () => {
	return (
		<ProfileStyled>
			<h1>This is profile</h1>
			{/*global user*/}
			{/*eslint no-undef: "error"*/}
			<h2>user {user}</h2>
		</ProfileStyled>
	);
};

export default Profile;
