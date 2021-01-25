import { gql } from '@apollo/client';

export const GET_TODOS = gql`
	query getTodos {
		todos {
			id
			description
			completed
			timestamp
		}
	}
`;

export const CREATE_TODO = gql`
	mutation createTodo($content: String) {
		createTodo(content: $content) {
			ok
		}
	}
`;

export const TOGGLE_TODO = gql`
	mutation toggleTodo($id: ID) {
		toggleTodo(id: $id) {
			ok
		}
	}
`;

export const DELETE_TODO = gql`
	mutation deleteTodo($id: ID) {
		deleteTodo(id: $id) {
			ok
		}
	}
`;

export const TODO_SUB = gql`
	subscription SubscribeToTodos {
		todoCreated {
			id
			description
			completed
			timestamp
		}
	}
`;
