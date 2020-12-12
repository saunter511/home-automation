import { gql } from '@apollo/client';

export const GET_BIRTHDAYS = gql`
	query getBirthdays {
		birthdaysThisMonth {
			birthDate
			fullName
		}
	}
`;

export const GET_USER = gql`
	query getUser {
		currentUser {
			id
			fullName
			lastLogin
		}
	}
`;
