import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
	query GetChatMessages {
		chatMessages {
			id
			content
			timestamp
			author {
				fullName
				shortName
			}
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation sendChatMessage($message: String) {
		sendChatMessage(message: $message) {
			ok
		}
	}
`;

export const MESSAGE_SUB = gql`
	subscription SubscribeToChatMessages {
		chatMessageSent {
			id
			content
			timestamp
			author {
				fullName
				shortName
			}
		}
	}
`;
