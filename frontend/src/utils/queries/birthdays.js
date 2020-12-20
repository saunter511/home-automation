import { gql } from '@apollo/client';

export const GET_BIRTHDAYS = gql`
	query upcomingBirtdays {
		birthdaysThisMonth {
			birthDate
			fullName
		}
	}
`;
